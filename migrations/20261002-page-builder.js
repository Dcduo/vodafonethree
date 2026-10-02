module.exports = function (migration) {
  const themeValues = ['white', 'soft', 'brand', 'dark', 'accent'];
  const widthValues = ['narrow', 'standard', 'wide'];
  const spacingValues = ['compact', 'normal', 'spacious'];
  const alignmentValues = ['left', 'center'];

  const richTextBlock = migration.createContentType('demoRichTextBlock', {
    name: 'Demo - Text block',
    description: 'Reusable heading and long-form text block for DemoPage layouts.',
    displayField: 'internalName',
  });

  richTextBlock.createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .required(true);

  richTextBlock.createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol');

  richTextBlock.createField('heading')
    .name('Heading')
    .type('Symbol');

  richTextBlock.createField('body')
    .name('Body')
    .type('Text');

  richTextBlock.createField('alignment')
    .name('Alignment')
    .type('Symbol')
    .validations([{ in: alignmentValues }]);

  richTextBlock.createField('width')
    .name('Content width')
    .type('Symbol')
    .validations([{ in: widthValues }]);

  const featureBanner = migration.createContentType('demoFeatureBanner', {
    name: 'Demo - Feature banner',
    description: 'Flexible promotional banner with optional image and calls to action.',
    displayField: 'internalName',
  });

  featureBanner.createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .required(true);

  featureBanner.createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol');

  featureBanner.createField('heading')
    .name('Heading')
    .type('Symbol')
    .required(true);

  featureBanner.createField('body')
    .name('Body')
    .type('Text');

  featureBanner.createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset');

  featureBanner.createField('layout')
    .name('Layout')
    .type('Symbol')
    .validations([{ in: ['text-only', 'image-left', 'image-right', 'image-background'] }]);

  featureBanner.createField('theme')
    .name('Theme')
    .type('Symbol')
    .validations([{ in: themeValues }]);

  featureBanner.createField('primaryCtaText')
    .name('Primary CTA text')
    .type('Symbol');

  featureBanner.createField('primaryCtaUrl')
    .name('Primary CTA URL')
    .type('Symbol');

  featureBanner.createField('secondaryCtaText')
    .name('Secondary CTA text')
    .type('Symbol');

  featureBanner.createField('secondaryCtaUrl')
    .name('Secondary CTA URL')
    .type('Symbol');

  const tab = migration.createContentType('demoTab', {
    name: 'Demo - Tab',
    description: 'One tab within a Demo tab group.',
    displayField: 'internalName',
  });

  tab.createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .required(true);

  tab.createField('label')
    .name('Tab label')
    .type('Symbol')
    .required(true);

  tab.createField('heading')
    .name('Heading')
    .type('Symbol');

  tab.createField('body')
    .name('Body')
    .type('Text');

  tab.createField('image')
    .name('Image')
    .type('Link')
    .linkType('Asset');

  tab.createField('ctaText')
    .name('CTA text')
    .type('Symbol');

  tab.createField('ctaUrl')
    .name('CTA URL')
    .type('Symbol');

  const tabGroup = migration.createContentType('demoTabGroup', {
    name: 'Demo - Tab group',
    description: 'Tabbed content component containing two to eight Demo tabs.',
    displayField: 'internalName',
  });

  tabGroup.createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .required(true);

  tabGroup.createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol');

  tabGroup.createField('heading')
    .name('Heading')
    .type('Symbol');

  tabGroup.createField('intro')
    .name('Intro')
    .type('Text');

  tabGroup.createField('theme')
    .name('Theme')
    .type('Symbol')
    .validations([{ in: themeValues }]);

  tabGroup.createField('tabs')
    .name('Tabs')
    .type('Array')
    .required(true)
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [{ linkContentType: ['demoTab'] }],
    })
    .validations([{ size: { min: 2, max: 8 } }]);

  const sectionContainer = migration.createContentType('demoSectionContainer', {
    name: 'Demo - Section container',
    description: 'Full-width coloured section that groups banners, text blocks and tab groups.',
    displayField: 'internalName',
  });

  sectionContainer.createField('internalName')
    .name('Internal name')
    .type('Symbol')
    .required(true);

  sectionContainer.createField('eyebrow')
    .name('Eyebrow')
    .type('Symbol');

  sectionContainer.createField('heading')
    .name('Section heading')
    .type('Symbol');

  sectionContainer.createField('intro')
    .name('Section intro')
    .type('Text');

  sectionContainer.createField('theme')
    .name('Theme')
    .type('Symbol')
    .validations([{ in: themeValues }]);

  sectionContainer.createField('spacing')
    .name('Vertical spacing')
    .type('Symbol')
    .validations([{ in: spacingValues }]);

  sectionContainer.createField('maxWidth')
    .name('Content width')
    .type('Symbol')
    .validations([{ in: widthValues }]);

  sectionContainer.createField('blocks')
    .name('Blocks')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Entry',
      validations: [
        {
          linkContentType: [
            'demoFeatureBanner',
            'demoRichTextBlock',
            'demoTabGroup',
          ],
        },
      ],
    });

  // Preserve the existing DAM prototype component while allowing the new
  // modular page-builder components to be added directly to DemoPage sections.
  const demoPage = migration.editContentType('demoPage');
  demoPage.editField('sections').items({
    type: 'Link',
    linkType: 'Entry',
    validations: [
      {
        linkContentType: [
          'demoBattenburg',
          'demoFeatureBanner',
          'demoRichTextBlock',
          'demoTabGroup',
          'demoSectionContainer',
        ],
      },
    ],
  });
};
