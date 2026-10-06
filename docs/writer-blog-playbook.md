# Writer: create a Contentful blog post

Add this short instruction to the existing agent/playbook after the brief-generation step. Keep your existing brand, accuracy and approval instructions.

> Use the supplied keyword brief to create one Blog Page (`blogPage`) in the configured **test** Contentful space/environment. First inspect the current model and locale; do not guess field IDs or reuse the old DemoPage/PageStandard types. Create an ordered set of Blog Section (`blogSection`) entries, then link their returned entry IDs in the page’s `sections` field. Section headings must not include numbers: the website supplies numbering, contents and reading time. Write `body` as text with blank lines between paragraphs; supported inline formatting is `**bold**` and `[label](https://url)`. Put how-to actions in `instructions` (a list of short strings, each at most 256 characters). Optional `callout` is plain text using the same inline formatting. Use only supplied, approved images: link an existing Contentful image in `image`, or use an approved HTTPS `imageUrl`; always provide `imageAlt`. Omit images if none are supplied. Fill page `title`, unique lowercase hyphenated `slug`, `publishedDate` (the agreed date in ISO 8601), `overview`, and optional `seoTitle`/`seoDescription`. Preserve the brief’s scope and do not invent claims, prices, links or image URLs. When publishing is authorised, publish referenced image assets and sections first, then the page. Read back the page and its links to verify the result. Return the actual entry ID, publication status and `https://vodafonethree.darranmcdonnell.co.uk/blog/<slug>`. Never claim it is published or visible unless confirmed; report incomplete steps explicitly.

The connector may wrap fields by locale automatically. Inspect its schema before sending data. With raw CMA requests, field values are keyed by the **actual space locale**, for example:

```json
{
  "fields": {
    "title": { "en-GB": "Your article title" },
    "slug": { "en-GB": "your-article-title" },
    "publishedDate": { "en-GB": "2026-10-07T09:00:00Z" },
    "overview": { "en-GB": "A concise introduction based on the brief." },
    "sections": { "en-GB": [
      { "sys": { "type": "Link", "linkType": "Entry", "id": "ACTUAL_SECTION_ENTRY_ID" } }
    ] }
  }
}
```

`en-GB` and the entry ID above are examples, not values to copy without checking. The repository’s Next.js default locale is `en-US`; that does not establish the Contentful space’s locale. Refresh/reconnect the agent’s Contentful schema after creating the models if new types are not listed. The agent needs create/update entry access and publish access if the demo includes publication.

Suggested rehearsal input: a short keyword brief, intended audience, tone, factual source material, desired section count, one or two approved image references, a unique slug and explicit instruction to publish to the test space. Open the returned URL in a fresh browser window to check the published version rather than an existing preview session.
