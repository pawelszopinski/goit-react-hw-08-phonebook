import React from 'react';
import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';

function ContactList() {
  const filteredContacts = useSelector(state => state.phonebook.contacts);

  return (
    <ul className="contact-list">
      {filteredContacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}

export default ContactList;
