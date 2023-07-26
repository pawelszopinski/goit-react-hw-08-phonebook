import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/phonebookSlice';
import './ContactFilter.css';

function ContactFilter() {
  const filter = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  function handleChange(event) {
    dispatch(setFilter(event.target.value));
  }

  return (
    <div className="contact-filter">
      <label htmlFor="filter" className="contact-filter__label">
        Filter by Name:
      </label>
      <input
        type="text"
        id="filter"
        className="contact-filter__input"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}

export default ContactFilter;
