import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles.module.scss';


const BaseLayout = ({ children }) => {

  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>SurveyPilot</Link>
        </div>
        <div className={styles.navItems}>
          {isAuthenticated ? (
            <>
              <Link to="/polls" className={styles.navLink}>Create Poll</Link>
              <Link to="/surveys" className={styles.navLink}>Create Survey</Link>
              <Link to="/admin" className={styles.navLink}>Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>Login</Link>
              <Link to="/register" className={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </nav>
      {children}
    </div>
  )

}


export default BaseLayout