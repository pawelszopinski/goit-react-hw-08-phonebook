import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/phonebookSlice';
import './ContactFilter.css';


function ContactFilter() {
  const filterValue = useSelector(state => state.phonebook.filter);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  return (
    <div className="contact-filter">
      <label htmlFor="filter" className="contact-filter__label">
        Filter by Name:
      </label>
      <input
        type="text"
        id="filter"
        className="contact-filter__input"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default ContactFilter;
