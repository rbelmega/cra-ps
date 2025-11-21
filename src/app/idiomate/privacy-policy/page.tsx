import React from 'react';
import ReactMarkdown from 'react-markdown';

export default async function Page() {
  const response = await fetch('https://www.belmeha.com/privacy_policy_idiomate.md');
  const data = await response.text();

  return (
    <section className="privacy-policy">
      <ReactMarkdown children={data} />
    </section>
  );
}
