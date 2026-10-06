/* Node 18+, no additional packages. Dry-run by default. Credentials stay server-side. */
const models = require('./blog-content-models.json');

function normalise(value) {
  if (Array.isArray(value)) return value.map(normalise);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .filter(key => !['disabled', 'omitted'].includes(key) || value[key] !== false)
        .filter(key => key !== 'validations' || value[key].length)
        .map(key => [key, normalise(value[key])]),
    );
  return value;
}

function matches(existing, model) {
  return (
    existing.displayField === model.displayField &&
    JSON.stringify(normalise(existing.fields)) === JSON.stringify(normalise(model.fields))
  );
}

async function setup({
  env = process.env,
  apply = false,
  fetchImpl = fetch,
  log = console.log,
} = {}) {
  const space = env.CONTENTFUL_SPACE_ID;
  const environment = env.CONTENTFUL_ENVIRONMENT || 'master';
  const token = env.CONTENTFUL_MANAGEMENT_TOKEN;
  if (!space || !token)
    throw new Error(
      'Set CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN (a management token, not a delivery key).',
    );
  const host = env.CONTENTFUL_REGION === 'eu' ? 'api.eu.contentful.com' : 'api.contentful.com';
  const root = `https://${host}/spaces/${encodeURIComponent(space)}/environments/${encodeURIComponent(environment)}`;
  async function request(path, method = 'GET', body, version, allowMissing = false) {
    const response = await fetchImpl(`${root}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        ...(version !== undefined ? { 'X-Contentful-Version': String(version) } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(15000),
    });
    if (response.status === 404 && allowMissing) return null;
    if (!response.ok) {
      throw new Error(
        `Contentful returned ${response.status} for ${method} ${path}. ${[401, 403, 404].includes(response.status) ? 'Check the management token, region, space ID and environment access.' : 'No existing content was overwritten; inspect your content models before retrying.'}`,
      );
    }
    return response.json();
  }
  // Check access and ALL collisions before creating either model.
  await request('');
  const localeData = await request('/locales');
  const locale = localeData.items.find(item => item.default)?.code;
  log(`Target: space ${space}, environment ${environment}, default locale ${locale || 'unknown'}.`);
  const existing = new Map();
  for (const model of models) {
    const found = await request(`/content_types/${model.id}`, 'GET', undefined, undefined, true);
    if (found && !matches(found, model))
      throw new Error(
        `Content type ${model.id} already exists with a different schema. Stopping without changes.`,
      );
    if (found?.sys.publishedVersion && found.sys.version !== found.sys.publishedVersion + 1) {
      throw new Error(
        `${model.id} has unpublished model changes. Review and publish it in Contentful, then rerun.`,
      );
    }
    existing.set(model.id, found);
  }
  for (const model of models) {
    let found = existing.get(model.id);
    log(
      `${apply ? 'Apply' : 'Dry run'}: ${found ? 'reuse' : 'create'} ${model.id}${found?.sys.publishedVersion ? '' : ' and publish the model'}.`,
    );
    if (!apply) continue;
    if (!found) {
      const { id, ...body } = model;
      found = await request(`/content_types/${id}`, 'PUT', body);
    }
    if (!found.sys.publishedVersion)
      await request(`/content_types/${model.id}/published`, 'PUT', undefined, found.sys.version);
  }
  log(
    apply
      ? 'Blog models are ready. Refresh Writer’s Contentful tools/schema before creating entries.'
      : 'No changes made. Run again with --apply to create the two blog models.',
  );
}

module.exports = { setup, matches };
if (require.main === module) {
  const unknown = process.argv.slice(2).filter(arg => arg !== '--apply');
  if (unknown.length) {
    console.error('Usage: node scripts/setup-blog-models.cjs [--apply]');
    process.exitCode = 1;
  } else
    setup({ apply: process.argv.includes('--apply') }).catch(error => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
