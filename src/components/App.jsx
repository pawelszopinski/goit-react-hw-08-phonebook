import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

function App() {
  const [state, setState] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return {
      contacts: storedContacts ? JSON.parse(storedContacts) : [],
      filter: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  function addContact(contact) {
    const existingContact = state.contacts.find(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (existingContact) {
      alert('Contact with the same name already exists!');
    } else {
      setState(prevState => ({
        ...prevState,
        contacts: [...prevState.contacts, { id: nanoid(), ...contact }],
      }));
    }
  }

  function deleteContact(id) {
    setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  }

  function setFilter(filter) {
    setState(prevState => ({
      ...prevState,
      filter: filter,
    }));
  }

  const filteredContacts = state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  return (
    <div className="contact-app">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <ContactFilter filter={state.filter} setFilter={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
