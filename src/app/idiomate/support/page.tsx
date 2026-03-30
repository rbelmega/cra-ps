import React from 'react';
import ReactMarkdown from 'react-markdown';
import { loadPublicText } from '../../../domain/public-content';

export default async function Page() {
  const data = await loadPublicText('support_idiomate.md');

  return (
    <section className="privacy-policy">
      <ReactMarkdown children={data} />
    </section>
  );
}
