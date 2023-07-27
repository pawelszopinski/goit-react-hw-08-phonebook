import React from 'react';
import { useDispatch } from 'react-redux';
import { removeContactFromBackend } from 'redux/phonebookSlice';
import './ContactItem.css';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeContactFromBackend(contact.id));
  }

  return (
    <li className="contact-item">
      <span className="contact-item__name">{contact.name}</span>
      <span className="contact-item__number">{contact.number}</span>
      <button className="contact-item__delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default ContactItem;
