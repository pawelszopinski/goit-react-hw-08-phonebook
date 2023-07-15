import React from 'react';
import './ContactItem.css';
import PropTypes from 'prop-types';

function ContactItem({ contact, onDelete }) {
  function handleDelete() {
    onDelete(contact.id);
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
ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactItem;
