import type { NextApiRequest, NextApiResponse } from 'next';

import { graphQlClient } from '@src/lib/client';

type DiagnosticResponse = {
  ok: boolean;
  environment: string;
  spaceConfigured: boolean;
  accessTokenConfigured: boolean;
  slug?: string;
  entryFound?: boolean;
  entry?: {
    id: string;
    internalName?: string | null;
    title?: string | null;
    slug?: string | null;
  } | null;
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

const QUERY = `
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiagnosticResponse>,
) {
  if (!isDeployPreviewRequest(req)) {
    res.status(404).json({
      ok: false,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'default/master',
      spaceConfigured: Boolean(process.env.CONTENTFUL_SPACE_ID),
      accessTokenConfigured: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
      error: 'Diagnostics are only available on deploy previews.',
    });
    return;
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug : '';

  if (!slug) {
    res.status(400).json({
      ok: false,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'default/master',
      spaceConfigured: Boolean(process.env.CONTENTFUL_SPACE_ID),
      accessTokenConfigured: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
      error: 'A slug query parameter is required.',
    });
    return;
  }

  try {
    const data = await graphQlClient.request<MinimalPageQueryResponse>(QUERY, { slug });
    const entry = data.pageStandardCollection?.items[0] ?? null;

    res.status(200).json({
      ok: true,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'default/master',
      spaceConfigured: Boolean(process.env.CONTENTFUL_SPACE_ID),
      accessTokenConfigured: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
      slug,
      entryFound: Boolean(entry),
      entry: entry
        ? {
            id: entry.sys.id,
            internalName: entry.internalName,
            title: entry.title,
            slug: entry.slug,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'default/master',
      spaceConfigured: Boolean(process.env.CONTENTFUL_SPACE_ID),
      accessTokenConfigured: Boolean(process.env.CONTENTFUL_ACCESS_TOKEN),
      slug,
      error: safeErrorMessage(error),
    });
  }
}
