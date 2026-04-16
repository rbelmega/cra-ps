import React from 'react';
import { MarkdownPage } from '../../../components/markdown-page/MarkdownPage';
import { loadPublicText } from '../../../domain/public-content';

export default async function Page() {
  const data = await loadPublicText('support_idiomate.md');

  return <MarkdownPage content={data} />;
}
