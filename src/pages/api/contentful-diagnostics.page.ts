import type { NextApiRequest, NextApiResponse } from 'next';

import { graphQlClient, previewGraphQlClient } from '@src/lib/client';

type DiagnosticEntry = {
  id: string;
  internalName?: string | null;
  title?: string | null;
  slug?: string | null;
};

type SlugMatch = {
  collection: string;
  typename: string;
  id: string;
  slug?: string | null;
};

type SectionRef = {
  typename: string;
  id: string;
};

type DiagnosticResponse = {
  ok: boolean;
  environment: string;
  spaceConfigured: boolean;
  accessTokenConfigured: boolean;
  previewAccessTokenConfigured: boolean;
  slug?: string;
  entryFound?: boolean;
  entry?: DiagnosticEntry | null;
  candidateCollections?: string[];
  matches?: SlugMatch[];
  publishedSections?: SectionRef[];
  previewSections?: SectionRef[];
  previewError?: string;
  error?: string;
};

type MinimalPageQueryResponse = {
  pageStandardCollection?: {
    items: Array<{
      sys: { id: string };
      internalName?: string | null;
      title?: string | null;
      slug?: string | null;
    } | null>;
  } | null;
};

type DemoSectionsQueryResponse = {
  demoPageCollection?: {
    items: Array<{
      sys: { id: string };
      internalName?: string | null;
      slug?: string | null;
      sectionsCollection?: {
        items: Array<{
          __typename: string;
          sys: { id: string };
        } | null>;
      } | null;
    } | null>;
  } | null;
};

type IntrospectionResponse = {
  __schema: {
    queryType: {
      fields: Array<{
        name: string;
        args: Array<{
          name: string;
          type: {
            kind: string;
            name?: string | null;
            ofType?: {
              kind: string;
              name?: string | null;
            } | null;
          };
        }>;
      }>;
    };
    types: Array<{
      kind: string;
      name?: string | null;
      inputFields?: Array<{ name: string }> | null;
    }>;
  };
};

type DynamicSearchResponse = Record<
  string,
  {
    items: Array<{
      __typename: string;
      sys: { id: string };
      slug?: string | null;
    } | null>;
  } | null
>;

const PAGE_STANDARD_QUERY = `
  query DiagnosticPageStandard($slug: String!) {
    pageStandardCollection(limit: 1, where: { slug: $slug }) {
      items {
        sys {
          id
        }
        internalName
        title
        slug
      }
    }
  }
`;

const DEMO_SECTIONS_QUERY = `
  query DiagnosticDemoSections($slug: String!, $preview: Boolean) {
    demoPageCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
      items {
        sys {
          id
        }
        internalName
        slug
        sectionsCollection(limit: 50) {
          items {
            __typename
            sys {
              id
            }
          }
        }
      }
    }
  }
`;

const INTROSPECTION_QUERY = `
  query DiagnosticSchema {
    __schema {
      queryType {
        fields {
          name
          args {
            name
            type {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
      types {
        kind
        name
        inputFields {
          name
        }
      }
    }
  }
`;

const safeErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { errors?: Array<{ message?: string }> } }).response;
    const messages = response?.errors
      ?.map(item => item.message)
      .filter((message): message is string => Boolean(message));

    if (messages?.length) {
      return messages.join(' | ');
    }
  }

  return error instanceof Error ? error.message : 'Unknown Contentful error';
};

const isDeployPreviewRequest = (req: NextApiRequest): boolean => {
  if (process.env.CONTEXT === 'deploy-preview') {
    return true;
  }

  const host = (req.headers.host || '').toLowerCase();

  return (
    host.startsWith('deploy-preview-') &&
    host.includes('--') &&
    host.endsWith('.netlify.app')
  );
};

const namedType = (type: {
  name?: string | null;
  ofType?: { name?: string | null } | null;
}): string | null => type.name || type.ofType?.name || null;

const findSlugCollections = async (): Promise<string[]> => {
  const schema = await graphQlClient.request<IntrospectionResponse>(INTROSPECTION_QUERY);

  const inputTypes = new Map(
    schema.__schema.types
      .filter(type => type.kind === 'INPUT_OBJECT' && type.name)
      .map(type => [type.name as string, type.inputFields?.map(field => field.name) ?? []]),
  );

  return schema.__schema.queryType.fields
    .filter(field => field.name.endsWith('Collection'))
    .filter(field => {
      const whereArg = field.args.find(arg => arg.name === 'where');
      if (!whereArg) return false;

      const filterTypeName = namedType(whereArg.type);
      if (!filterTypeName) return false;

      return inputTypes.get(filterTypeName)?.includes('slug') ?? false;
    })
    .map(field => field.name)
    .sort();
};

const searchSlugAcrossCollections = async (
  slug: string,
  collections: string[],
): Promise<SlugMatch[]> => {
  if (!collections.length) return [];

  const selections = collections
    .map(
      (collection, index) => `
        c${index}: ${collection}(limit: 1, where: { slug: $slug }) {
          items {
            __typename
            sys {
              id
            }
            slug
          }
        }
      `,
    )
    .join('\n');

  const query = `
    query DiagnosticSlugSearch($slug: String!) {
      ${selections}
    }
  `;

  const data = await graphQlClient.request<DynamicSearchResponse>(query, { slug });

  return collections.flatMap((collection, index) => {
    const item = data[`c${index}`]?.items[0];
    if (!item) return [];

    return [
      {
        collection,
        typename: item.__typename,
        id: item.sys.id,
        slug: item.slug,
      },
    ];
  });
};

const sectionRefs = (data: DemoSectionsQueryResponse): SectionRef[] => {
  const sections = data.demoPageCollection?.items[0]?.sectionsCollection?.items ?? [];

  return sections.flatMap(section =>
    section
      ? [{
          typename: section.__typename,
          id: section.sys.id,
        }]
      : [],
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiagnosticResponse>,
) {
  const base = {
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'default/master',
    spaceConfigured: Boolean(process.env.CONTENTFUL_SPACE_ID),
    accessTokenConfigured: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
    previewAccessTokenConfigured: Boolean(process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN),
  };

  if (!isDeployPreviewRequest(req)) {
    res.status(404).json({
      ok: false,
      ...base,
      error: 'Diagnostics are only available on deploy previews.',
    });
    return;
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';

  if (!slug) {
    res.status(400).json({
      ok: false,
      ...base,
      error: 'A slug query parameter is required.',
    });
    return;
  }

  try {
    const data = await graphQlClient.request<MinimalPageQueryResponse>(PAGE_STANDARD_QUERY, {
      slug,
    });
    const entry = data.pageStandardCollection?.items[0] ?? null;

    const candidateCollections = entry ? [] : await findSlugCollections();
    const matches = entry
      ? []
      : await searchSlugAcrossCollections(slug, candidateCollections);

    let publishedSections: SectionRef[] = [];
    let previewSections: SectionRef[] = [];
    let previewError: string | undefined;

    if (matches.some(match => match.typename === 'DemoPage')) {
      const publishedData = await graphQlClient.request<DemoSectionsQueryResponse>(
        DEMO_SECTIONS_QUERY,
        { slug, preview: false },
      );
      publishedSections = sectionRefs(publishedData);

      if (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
        try {
          const previewData = await previewGraphQlClient.request<DemoSectionsQueryResponse>(
            DEMO_SECTIONS_QUERY,
            { slug, preview: true },
          );
          previewSections = sectionRefs(previewData);
        } catch (error) {
          previewError = safeErrorMessage(error);
        }
      }
    }

    res.status(200).json({
      ok: true,
      ...base,
      slug,
      entryFound: Boolean(entry) || matches.length > 0,
      entry: entry
        ? {
            id: entry.sys.id,
            internalName: entry.internalName,
            title: entry.title,
            slug: entry.slug,
          }
        : null,
      candidateCollections,
      matches,
      publishedSections,
      previewSections,
      previewError,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      ...base,
      slug,
      error: safeErrorMessage(error),
    });
  }
}
