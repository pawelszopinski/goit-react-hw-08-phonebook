import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/authSlice';

function UserMenu() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout())
      .then(() => {
        // Pomyślnie wylogowano - możemy wykonać odpowiednie akcje, np. przekierowanie na stronę logowania
        console.log('Logged out successfully!');
      })
      .catch(error => {
        // Błąd wylogowywania - wyświetlamy komunikat błędu, itp.
        console.error('Logout error:', error);
      });
  }

  return (
    <div className="user-menu">
      {/* Wyświetlamy nazwę użytkownika i email tylko jeśli użytkownik jest zalogowany */}
      {user && (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserMenu;
