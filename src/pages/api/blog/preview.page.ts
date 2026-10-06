import { timingSafeEqual } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import { getBlog } from '@src/lib/blog/contentful';

export default async function previewBlog(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  const expected = process.env.CONTENTFUL_PREVIEW_SECRET;
  const { secret, slug } = req.query;
  if (
    !expected ||
    typeof secret !== 'string' ||
    Buffer.byteLength(secret) !== Buffer.byteLength(expected) ||
    !timingSafeEqual(Buffer.from(secret), Buffer.from(expected))
  ) {
    return res.status(401).json({ message: 'Invalid preview token' });
  }
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    return res.status(400).json({ message: 'Invalid slug' });
  try {
    const page = await getBlog(slug, true);
    if (!page) return res.status(404).json({ message: 'Blog not found' });
    res.setPreviewData({}, { maxAge: 3600 });
    return res.redirect(307, `/blog/${encodeURIComponent(slug)}`);
  } catch {
    return res
      .status(503)
      .json({
        message:
          'Blog preview unavailable; check the model, linked content and preview configuration.',
      });
  }
}
