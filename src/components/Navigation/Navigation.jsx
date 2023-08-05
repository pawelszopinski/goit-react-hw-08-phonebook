import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'; 

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <Link to="/register" className={styles.navigation__link}>
            Register
          </Link>
        </li>
        <li className={styles.navigation__item}>
          <Link to="/login" className={styles.navigation__link}>
            Login
          </Link>
        </li>
        <li className={styles.navigation__item}>
          <Link to="/contacts" className={styles.navigation__link}>
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
