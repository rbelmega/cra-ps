import React from 'react';
import ReactMarkdown from 'react-markdown';

export default async function Page() {
  const response = await fetch('https://belmeha.com/privacy_policy.md');
  const data = await response.text();

  return (
    <section className="privacy-policy">
      <ReactMarkdown children={data} />
    </section>
  );
}
