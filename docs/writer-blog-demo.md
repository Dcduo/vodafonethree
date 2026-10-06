# Writer → Contentful → Vodafone-style blog demo

## What is ready in this branch

- `/demo/blog-preview` renders an original six-section sample without Contentful credentials, using the same article component as published posts.
- `/blog/<slug>` loads `blogPage` from the Contentful Delivery API on each request. Newly published entries do not require a Netlify rebuild; allow a short period for Contentful delivery propagation.
- Red title/date/read-time hero, overview card, linked contents, automatic section numbers, wide images, green tick instructions and optional callouts.
- Responsive desktop/mobile styling, semantic headings, keyboard focus and a mobile navigation menu.
- Two new, isolated content models. Existing DemoPage, DemoBattenburg and PageStandard behavior is unchanged. The parked page-builder migration is not required.
- `/api/blog/preview?secret=<preview-secret>&slug=<slug>` enables a one-hour draft preview using the existing server-side preview secret and token. Use Contentful's protected preview configuration; do not put the secret into Writer output or public links.

## Header and footer: exact scope

The reference is https://www.vodafone.co.uk/blog/save-battery-samsung and the supplied laptop screenshot. The blog uses the logo SVG, font URLs and footer link destinations found in that page, with a local responsive recreation of the navigation and footer layout. This is **not** Vodafone’s live header/footer application: mega-menus, search, sign-in and checkout have not been transplanted. Navigation links lead to Vodafone’s own website. No Vodafone application JavaScript, analytics or account forms are embedded. The footer identifies this as a demonstration site, and blog pages use `noindex, nofollow`.

Fonts and sample photos are served from Vodafone’s public asset hosts and need network access during the demo. An Arial fallback is provided. Writer should use supplied approved assets for new articles; do not ask it to invent image URLs. For a more self-contained rehearsal, upload approved images to the test Contentful space and use asset references.

## Content contract

| Model | Fields | Display behavior |
| --- | --- | --- |
| `blogPage` | Required `title`, `slug`, `publishedDate`, `overview`, `sections`; optional `seoTitle`, `seoDescription` | One article at `/blog/<slug>`; sections are displayed in reference-array order |
| `blogSection` | Required `heading`, `body`; optional `instructions`, `image`, `imageUrl`, `imageAlt`, `callout` | Numbered heading, image, paragraphs, tick list and optional callout |

`body`, `overview` and `callout` are long text; the renderer supports paragraphs, `**bold**` and `[label](https://url)`. They are not HTML or Contentful Rich Text. `instructions` is an array of short text strings. `image` is a Contentful Asset reference and takes precedence over `imageUrl`. Alternative text is required by the renderer whenever an image is used. Missing/unpublished sections or assets cause a visible temporary-unavailable response rather than quietly dropping part of an article. API/authentication errors return 503, while a genuinely absent slug returns 404.

## Fast setup on Windows PowerShell

1. Deploy this branch to the existing Netlify test site, or use its Netlify deploy preview. First check `/demo/blog-preview` on that deployed host. The normal custom-domain URLs below require this branch to be deployed there; opening a pull request alone does not update production.
2. In the repository folder, run the model setup with a **Contentful personal access / management token** that can manage content models in the test space. Do not use the delivery token. This script needs Node.js 18+ and no package install. Use the actual test space ID and environment from Contentful Settings, not the organisation ID. The earlier failed migration does not need to run.

```powershell
$env:CONTENTFUL_SPACE_ID = Read-Host 'Contentful test space ID'
$env:CONTENTFUL_ENVIRONMENT = 'master' # change if the Writer connector uses another environment
$secureToken = Read-Host 'Contentful management token' -AsSecureString
$env:CONTENTFUL_MANAGEMENT_TOKEN = [System.Net.NetworkCredential]::new('', $secureToken).Password

# Add only for an EU data residency space:
# $env:CONTENTFUL_REGION = 'eu'

node scripts/setup-blog-models.cjs
# After checking the printed test-space target and dry-run result:
node scripts/setup-blog-models.cjs --apply

Remove-Item Env:CONTENTFUL_MANAGEMENT_TOKEN
Remove-Variable secureToken
```

The dry run checks access, prints the default locale and verifies both model IDs before any write. Apply creates/publishes only `blogSection` and `blogPage`. It reuses matching published models, refuses conflicting schemas or unpublished model edits, and never deletes or overwrites existing content. If interrupted after creating one model, rerun. If access returns 401/403/404, check the token's account/permissions, space ID, environment and EU region; re-running the old migration will not fix access.

3. In Netlify, retain `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`. Add `CONTENTFUL_ENVIRONMENT` if needed; set `CONTENTFUL_REGION=eu` only for an EU space. Leave `CONTENTFUL_BLOG_LOCALE` empty to use the space’s default locale, or set it to the exact locale Writer uses. Draft preview additionally needs `CONTENTFUL_PREVIEW_ACCESS_TOKEN` and `CONTENTFUL_PREVIEW_SECRET`. **Never put a management token on the website or in a `NEXT_PUBLIC_` variable.** Redeploy once if changing Netlify environment variables.
4. Refresh Writer's Contentful model/tool schema, then append [the short Writer instructions](writer-blog-playbook.md) to the working agent. Verify the connector can create linked entries and publish in the same test environment.
5. Rehearse with a new, unique slug. Publish any image assets, then sections, then the page. Open `https://vodafonethree.darranmcdonnell.co.uk/blog/<slug>` (or the equivalent preview-host URL). Compare the title, section count, images and contents links to the Contentful entry.

If management-token access remains blocked, create the two models manually using `scripts/blog-content-models.json` as the exact field specification. The visual preview remains available independently, but it is not evidence of a successful Writer-to-Contentful publication.

## Validation

Run `node scripts/test-blog.cjs` after installing project dependencies. It exercises ordered link resolution, missing/unpublished content, safe URLs, asset alternative text, selected locale/environment and setup dry-run/idempotency/collision handling. Run the existing `yarn type-check` and build. The actual Contentful and Writer round trip needs credentials and must be rehearsed against the test space before the presentation.

Reference documentation: [Contentful links](https://www.contentful.com/developers/docs/concepts/links/), [content model management](https://www.contentful.com/developers/docs/references/content-management-api/content-types/) and [entry publication](https://www.contentful.com/developers/docs/references/content-management-api/entries/).
