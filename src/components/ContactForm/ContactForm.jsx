import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/phonebookSlice';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', number: '' });
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.name) {
      dispatch(addContact({ id: nanoid(), ...formData }));
      setFormData({ name: '', number: '' });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add Contact</legend>
        <div className="contact-form__group">
          <label htmlFor="name" className="contact-form__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            pattern="^[A-Za-z.'\- ]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            className="contact-form__input"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="number" className="contact-form__label">
            Number:
          </label>
          <input
            type="tel"
            id="number"
            name="number"
            pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            className="contact-form__input"
            onChange={handleChange}
            value={formData.number}
            required
          />
        </div>
        <button className="contact-form__button">Add</button>
      </fieldset>
    </form>
  );
}

export default ContactForm;
