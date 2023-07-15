import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

function App() {
  const [state, setState] = useState({
    contacts: [
      { id: nanoid(), name: 'John Doe', number: '123456789' },
      { id: nanoid(), name: 'James Bond', number: '987654321' },
      { id: nanoid(), name: 'Mike Tyson', number: '456789123' },
    ],
    filter: '',
  });

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
