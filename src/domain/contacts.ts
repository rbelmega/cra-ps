export interface Contact {
  name: string;
  link: string;
  color: string;
  letter: string;
}

export const getContacts = (): Contact[] => [
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
];
