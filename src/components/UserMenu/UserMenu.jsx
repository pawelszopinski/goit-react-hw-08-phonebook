import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/authSlice';
import styles from './UserMenu.module.css';

function UserMenu() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout())
      .then(() => {
        console.log('Logged out successfully!');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }
  console.log('User:', user);
  return (
    <div className={styles['user-menu']}>
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
