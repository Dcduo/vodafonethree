const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./setup-blog-models.cjs');
const models = require('./blog-content-models.json');

// Compile the isolated data boundary with the project's own TypeScript version.
function loadTs(relative) {
  const filename = path.resolve(__dirname, '..', relative);
  const ts = require('typescript');
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  const localRequire = name =>
    name === './types' ? loadTs('src/lib/blog/types.ts') : require(name);
  new Function('require', 'module', 'exports', source)(localRequire, module, module.exports);
  return module.exports;
}

const { resolveBlog, getBlog } = loadTs('src/lib/blog/contentful.ts');
const { safeUrl, sectionAnchor } = loadTs('src/lib/blog/types.ts');
const fixture = () => ({
  total: 1,
  items: [
    {
      sys: { id: 'page' },
      fields: {
        title: 'Test',
        slug: 'test',
        overview: 'Overview',
        publishedDate: '2026-10-07',
        sections: [{ sys: { id: 'second' } }, { sys: { id: 'first' } }],
      },
    },
  ],
  includes: {
    Entry: ['first', 'second'].map(id => ({
      sys: { id, contentType: { sys: { id: 'blogSection' } } },
      fields: { heading: id, body: 'Body text', instructions: ['Do this'] },
    })),
  },
});

test('preserves editorial order, unique anchors and JSON-safe optional fields', () => {
  const page = resolveBlog(fixture());
  assert.deepEqual(
    page.sections.map(s => s.id),
    ['second', 'first'],
  );
  assert.equal(page.sections[0].imageUrl, null);
  assert.equal(sectionAnchor(1), 'section-2');
  assert.deepEqual(JSON.parse(JSON.stringify(page)), page);
});
test('missing/unpublished links and duplicate slugs fail instead of silently truncating', () => {
  const data = fixture();
  data.includes.Entry.pop();
  assert.throws(() => resolveBlog(data), /missing or unpublished/);
  assert.throws(() => resolveBlog({ ...fixture(), total: 2 }), /More than one/);
  assert.equal(resolveBlog({ total: 0, items: [] }), null);
});
test('resolves Contentful assets, requires alt text and rejects unsafe URLs', () => {
  const data = fixture();
  const section = data.includes.Entry[0];
  section.fields.image = { sys: { id: 'asset' } };
  data.includes.Asset = [
    { sys: { id: 'asset' }, fields: { file: { url: '//images.ctfassets.net/test.jpg' } } },
  ];
  assert.throws(() => resolveBlog(data), /alternative text/);
  section.fields.imageAlt = 'Useful description';
  assert.equal(resolveBlog(data).sections[1].imageUrl, 'https://images.ctfassets.net/test.jpg');
  for (const url of [
    'javascript:alert(1)',
    'data:text/html,x',
    '//evil.test',
    '/\\evil.test',
    'https://name:password@evil.test',
  ])
    assert.equal(safeUrl(url), undefined);
  assert.equal(safeUrl('https://www.vodafone.co.uk/help'), 'https://www.vodafone.co.uk/help');
});
test('delivery uses the selected environment, server token and Contentful locale', async () => {
  const saved = { ...process.env };
  const oldFetch = global.fetch;
  Object.assign(process.env, {
    CONTENTFUL_SPACE_ID: 'test-space',
    CONTENTFUL_ENVIRONMENT: 'demo',
    CONTENTFUL_ACCESS_TOKEN: 'delivery-test',
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: 'preview-test',
    CONTENTFUL_BLOG_LOCALE: 'en-GB',
    CONTENTFUL_REGION: 'eu',
  });
  try {
    global.fetch = async (url, options) => {
      assert.equal(url.hostname, 'preview.eu.contentful.com');
      assert.match(url.pathname, /environments\/demo\/entries$/);
      assert.equal(url.searchParams.get('locale'), 'en-GB');
      assert.equal(options.headers.Authorization, 'Bearer preview-test');
      assert.equal(options.cache, 'no-store');
      return { ok: true, json: async () => fixture() };
    };
    assert.equal((await getBlog('test', true)).title, 'Test');
    assert.equal(await getBlog('../bad'), null);
    global.fetch = async () => ({ ok: false, status: 401 });
    await assert.rejects(() => getBlog('test'), /401/);
  } finally {
    global.fetch = oldFetch;
    process.env = saved;
  }
});

const env = { CONTENTFUL_SPACE_ID: 'test', CONTENTFUL_MANAGEMENT_TOKEN: 'test' };
function mockApi(existing = {}) {
  const writes = [];
  return {
    writes,
    fetchImpl: async (url, options) => {
      const p = new URL(url).pathname;
      const id = p.split('/content_types/')[1]?.split('/')[0];
      let value = p.endsWith('/locales')
        ? { items: [{ default: true, code: 'en-GB' }] }
        : { sys: { id: 'master' } };
      if (id) {
        if (options.method === 'GET') value = existing[id] || null;
        else {
          writes.push({ p, options });
          value = { sys: { version: 1 }, ...JSON.parse(options.body || '{}') };
        }
      }
      return { ok: value !== null, status: value === null ? 404 : 200, json: async () => value };
    },
  };
}
test('setup dry-run performs no writes; apply creates/publishes only the two models', async () => {
  const dry = mockApi();
  await setup({ env, ...dry, log() {} });
  assert.equal(dry.writes.length, 0);
  const apply = mockApi();
  await setup({ env, ...apply, apply: true, log() {} });
  assert.equal(apply.writes.length, 4);
  assert.equal(apply.writes[1].options.headers['X-Contentful-Version'], '1');
  assert.match(apply.writes[0].p, /blogSection$/);
  assert.match(apply.writes[2].p, /blogPage$/);
});
test('setup refuses collisions and unpublished edits before any mutation; rerun is idempotent', async () => {
  const collision = mockApi({ blogPage: { fields: [] } });
  await assert.rejects(
    () => setup({ env, ...collision, apply: true, log() {} }),
    /different schema/,
  );
  assert.equal(collision.writes.length, 0);
  const existing = Object.fromEntries(
    models.map(m => [m.id, { ...m, sys: { version: 2, publishedVersion: 1 } }]),
  );
  const repeat = mockApi(existing);
  await setup({ env, ...repeat, apply: true, log() {} });
  assert.equal(repeat.writes.length, 0);
  existing.blogPage.sys.version = 3;
  const draft = mockApi(existing);
  await assert.rejects(
    () => setup({ env, ...draft, apply: true, log() {} }),
    /unpublished model changes/,
  );
  assert.equal(draft.writes.length, 0);
});
