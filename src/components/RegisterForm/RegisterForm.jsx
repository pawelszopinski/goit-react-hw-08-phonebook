import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/authSlice';
import styles from './RegisterForm.module.css'

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
    <form className={styles.registerForm} onSubmit={handleSubmit}>
    <fieldset>
      <legend className={styles.registerForm__legend}>Register</legend>
      <div className={styles.registerForm__group}>
        <label htmlFor="name" className={styles.registerForm__label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.registerForm__input}
          pattern="[A-Za-z]{2,}"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.registerForm__group}>
        <label htmlFor="email" className={styles.registerForm__label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.registerForm__input}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.registerForm__group}>
        <label htmlFor="password" className={styles.registerForm__label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.registerForm__input}
          pattern=".{7,}"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className={styles.registerForm__button} type="submit">
        Register
      </button>
    </fieldset>
  </form>
  );
}

export default RegisterForm;