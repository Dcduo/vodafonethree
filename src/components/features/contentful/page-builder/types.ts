export type PageBuilderTheme = 'white' | 'soft' | 'brand' | 'dark' | 'accent';
export type PageBuilderWidth = 'narrow' | 'standard' | 'wide';
export type PageBuilderSpacing = 'compact' | 'normal' | 'spacious';
export type PageBuilderAlignment = 'left' | 'center';

export type PageBuilderAsset = {
  url?: string | null;
  title?: string | null;
  description?: string | null;
  width?: number | null;
  height?: number | null;
};

type PageBuilderBase = {
  __typename: string;
  sys: {
    id: string;
  };
  internalName?: string | null;
};

export type DemoRichTextBlock = PageBuilderBase & {
  __typename: 'DemoRichTextBlock';
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
  alignment?: PageBuilderAlignment | null;
  width?: PageBuilderWidth | null;
};

export type DemoFeatureBanner = PageBuilderBase & {
  __typename: 'DemoFeatureBanner';
  eyebrow?: string | null;
  heading?: string | null;
  body?: string | null;
  image?: PageBuilderAsset | null;
  layout?: 'text-only' | 'image-left' | 'image-right' | 'image-background' | null;
  theme?: PageBuilderTheme | null;
  primaryCtaText?: string | null;
  primaryCtaUrl?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaUrl?: string | null;
};

export type DemoTab = PageBuilderBase & {
  __typename: 'DemoTab';
  label?: string | null;
  heading?: string | null;
  body?: string | null;
  image?: PageBuilderAsset | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
};

export type DemoTabGroup = PageBuilderBase & {
  __typename: 'DemoTabGroup';
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  theme?: PageBuilderTheme | null;
  tabsCollection?: {
    items: Array<DemoTab | null>;
  } | null;
};

export type PageBuilderNestedBlock =
  | DemoRichTextBlock
  | DemoFeatureBanner
  | DemoTabGroup;

export type DemoSectionContainer = PageBuilderBase & {
  __typename: 'DemoSectionContainer';
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  theme?: PageBuilderTheme | null;
  spacing?: PageBuilderSpacing | null;
  maxWidth?: PageBuilderWidth | null;
  blocksCollection?: {
    items: Array<PageBuilderNestedBlock | null>;
  } | null;
};

export type PageBuilderBlock = PageBuilderNestedBlock | DemoSectionContainer;
