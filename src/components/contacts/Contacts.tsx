import React from 'react';
import styles from './Contacts.module.scss';
import { getContacts } from '../../domain/contacts';

export const Contacts: React.FC = () => {
  const contacts = getContacts();

  return (
    <ul className={styles.contactList}>
      {contacts.map((contact, index) => (
        <li key={index} className={styles.contactItem}>
          <a
            className={`${styles.contactLink} ${styles[contact.name.toLowerCase()]}`}
            href={contact.link}
            target="_blank"
          >
            {contact.name}
          </a>
        </li>
      ))}
    </ul>
  );
};
