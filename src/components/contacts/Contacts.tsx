'use client';

import React, { useState } from 'react';

interface Contact {
  name: string;
  link: string;
  color: string;
  letter: string;
  active?: boolean;
}

export const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      name: 'Linkedin',
      link: 'https://www.linkedin.com/in/rostyslav-belmega-8b540643',
      color: '#1A85BC',
      letter: 'l',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/izzz0',
      color: '#55ACEE',
      letter: 't',
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/r.belmega',
      color: '#3F5D9A',
      letter: 'f',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/rbelmega',
      color: '#fff',
      letter: 'g',
    },
  ]);

  return (
    <ul
      className="contact-list"
      style={{
        fontSize: '24px',
        width: 300,
        margin: 0,
        textAlign: 'left',
      }}
    >
      {contacts.map((contact, index) => {
        return (
          <li key={index}>
            <a
              style={{ color: contact.active ? contact.color : '' }}
              href={contact.link}
              onMouseEnter={() => {
                setContacts((cont) =>
                  cont.map((c) =>
                    c.name === contact.name ? { ...c, active: true } : c
                  )
                );
              }}
              onMouseLeave={() => {
                setContacts((cont) =>
                  cont.map((c) =>
                    c.name === contact.name ? { ...c, active: false } : c
                  )
                );
              }}
              target="_blank"
            >
              {contact.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
