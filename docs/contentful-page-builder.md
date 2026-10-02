# Contentful DemoPage page builder

This feature adds a modular component model for `DemoPage` while preserving the existing
`DemoBattenburg` DAM prototype.

## First component set

The migration creates:

- `demoFeatureBanner` — reusable promotional banner with theme, layout, image and two CTAs.
- `demoRichTextBlock` — heading and long-form copy with alignment and width controls.
- `demoTab` and `demoTabGroup` — reusable two-to-eight-tab content groups.
- `demoSectionContainer` — a full-width themed section that can contain banners, text blocks
  and tab groups.

It also extends the existing `demoPage.sections` reference validation so pages can contain
the new components alongside `demoBattenburg`.

## Safe rollout

1. Review the visual prototype at `/demo/page-builder-preview`. This page uses mock data and
   does not depend on the new Contentful models.
2. Apply the migration to a non-production Contentful environment first where possible.
3. Confirm the new content types in Contentful and create a small test page.
4. Regenerate the GraphQL schema/SDK.
5. Wire the new fragments into the DemoPage query and renderer.
6. Only then apply the same migration to `master`.

Contentful recommends testing content-model changes in a development environment before
promoting them to production.

## Running the migration

The migration requires a Contentful Management API token. Do not use the Delivery or Preview
API token and do not commit the management token to this repository.

With the Contentful CLI authenticated:

```bash
contentful space migration \
  --space-id "$CONTENTFUL_SPACE_ID" \
  --environment-id "master" \
  migrations/20261002-page-builder.js
```

Or supply the management token through the CLI's supported management-token option for your
installed CLI version.

After the models exist:

```bash
yarn graphql-codegen:generate
```

Do not run code generation against `master` until the migration has been applied there,
because the new GraphQL types will not exist beforehand.

## Design principles

The page model stays compositional rather than creating one content type per final page design.
Visual variation is represented by constrained fields such as `theme`, `layout`, `spacing`
and `maxWidth`. That keeps the authoring experience predictable for people and for Writer AI.
