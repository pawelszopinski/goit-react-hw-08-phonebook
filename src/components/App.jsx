import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
import { getUserInfo } from 'redux/authSlice';
import { fetchContacts } from 'redux/phonebookSlice';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo())
        .then(() => {
          console.log('User info loaded successfully!');
        })
        .catch(error => {
          console.error('User info loading error:', error);
        });
        dispatch(fetchContacts())
        .then(() => {
          console.log('Contacts fetched successfully!');
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }
  }, [dispatch, isLoggedIn]);
  console.log('isLoggedIn:', isLoggedIn);
  return (
    <div className="contact-app">
      <h1>Phonebook</h1>
      <Navigation />

      {isLoggedIn && <UserMenu />}
      {isLoggedIn && (
        <>
          <ContactForm />
          <ContactFilter />
        </>
      )}
      <Routes>
        {/* Prywatne trasy - wyświetlamy je tylko jeśli użytkownik jest zalogowany */}
        {isLoggedIn && (
          <>
            <Route path="/add" element={<ContactForm />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/filter" element={<ContactFilter />} />
          </>
        )}

        {/* Publiczne trasy - wyświetlamy je tylko jeśli użytkownik nie jest zalogowany */}
        {!isLoggedIn && <Route path="/login" element={<LoginForm />} />}
        {!isLoggedIn && <Route path="/register" element={<RegisterForm />} />}

        {/* Domyślna trasa - przekierowuje na stronę logowania jeśli użytkownik nie jest zalogowany */}
        <Route
          path="*"
          element={isLoggedIn ? <ContactList /> : <LoginForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
