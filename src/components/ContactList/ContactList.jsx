import React from 'react';
import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';

function ContactList({ onDelete }) {
  const filteredContacts = useSelector(state =>
    state.phonebook.contacts.filter(contact =>
      contact.name.toLowerCase().includes(state.phonebook.filter.toLowerCase())
    )
  );

  return (
    <ul className="contact-list">
      {filteredContacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ContactList;
