import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'redux/authSlice';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login(formData))
      .then(() => {
        // Pomyślnie zalogowano - możemy wykonać odpowiednie akcje, np. przekierowanie na stronę z listą kontaktów
        console.log('Logged in successfully!');
      })
      .catch(error => {
        // Błąd logowania - wyświetlamy komunikat błędu, itp.
        console.error('Login error:', error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-form__input"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password" className="login-form__label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-form__input"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <button className="login-form__button">Login</button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
