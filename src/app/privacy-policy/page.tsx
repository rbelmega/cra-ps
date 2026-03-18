import React from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPublicText } from '../../domain/public-content';

export default async function Page() {
  const data = await loadPublicText('privacy_policy.md');

  return (
    <section className="privacy-policy">
      <ReactMarkdown children={data} />
    </section>
  );
}
