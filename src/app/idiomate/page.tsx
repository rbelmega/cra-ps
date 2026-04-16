import React from 'react';
import { MarkdownPage } from '../../components/markdown-page/MarkdownPage';
import { loadPublicText } from '../../domain/public-content';

export default async function Page() {
  const data = await loadPublicText('privacy_policy_idiomate.md');

  return <MarkdownPage content={data} />;
}
