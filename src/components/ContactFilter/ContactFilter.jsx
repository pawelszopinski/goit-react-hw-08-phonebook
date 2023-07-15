import React from 'react';
import './ContactFilter.css';
import PropTypes from 'prop-types';

function ContactFilter({ filter, setFilter }) {
  function handleChange(event) {
    setFilter(event.target.value);
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

ContactFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default ContactFilter;
