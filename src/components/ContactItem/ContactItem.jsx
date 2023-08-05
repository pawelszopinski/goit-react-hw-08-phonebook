import React from 'react';
import { useDispatch } from 'react-redux';
import { removeContactFromBackend } from 'redux/phonebookSlice';
import styles from './ContactItem.module.css';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(removeContactFromBackend(contact.id));
  }

  return (
    <li className={styles.contactItem}>
    <span className={styles.contactItem__name}>{contact.name}</span>
    <span className={styles.contactItem__number}>{contact.number}</span>
    <button className={styles.contactItem__delete} onClick={handleDelete}>
      Delete
    </button>
  </li>
  );
}

export default ContactItem;
