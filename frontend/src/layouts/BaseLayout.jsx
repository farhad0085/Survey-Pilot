import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles.module.scss';
import { getInitials } from '../utils/auth';
import { DASHBOARD_PAGE, HOME_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../routes/urls';
import { ToastContainer } from 'react-toastify'


const BaseLayout = ({ children }) => {

  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to={HOME_PAGE} className={styles.logoLink}>SurveyPilot</Link>
        </div>
        <div className={styles.navItems}>
          {isAuthenticated ? (
            <>
              <Link to="/polls" className={styles.navLink}>Create Poll</Link>
              <Link to="/surveys" className={styles.navLink}>Create Survey</Link>

              <div className={styles.userMenu} ref={dropdownRef}>
                <div className={styles.userIcon} onClick={toggleDropdown}>
                  {getInitials(user)}
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link to={DASHBOARD_PAGE} className={styles.dropdownItem}>Dashboard</Link>
                    <Link to="/settings" className={styles.dropdownItem}>Settings</Link>
                    <Link to={LOGIN_PAGE} className={styles.dropdownItem} onClick={() => {
                      logout()
                      setDropdownOpen(false)
                    }}>Logout</Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={LOGIN_PAGE} className={styles.navLink}>Login</Link>
              <Link to={REGISTER_PAGE} className={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </nav>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {children}
    </div>
  )

}


export default BaseLayout