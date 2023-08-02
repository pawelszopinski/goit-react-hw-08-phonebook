import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/authSlice';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(register(formData))
      .then(() => {
        console.log('Registered successfully!');
        // Możemy tutaj wykonać odpowiednie akcje po pomyślnej rejestracji, np. przekierowanie na inną stronę
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Możemy tutaj wyświetlić komunikat błędu rejestracji na stronie
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Register</legend>
        <div className="register-form__group">
          <label htmlFor="name" className="register-form__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="register-form__input"
            pattern="[A-Za-z]{2,}"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="register-form__input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="password" className="register-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="register-form__input"
            pattern=".{7,}"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="register-form__button" type="submit">
          Register
        </button>
      </fieldset>
    </form>
  );
}

export default RegisterForm;