import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const PrivacyPolicy = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(`/privacy_policy.md`)
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);

  return (
    <section className="privacy-policy">
      <ReactMarkdown children={data} />
    </section>
  );
};

export default PrivacyPolicy;
