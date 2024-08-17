import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './styles.module.scss';
import { getInitials } from '../utils/auth';


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
          <Link to="/" className={styles.logoLink}>SurveyPilot</Link>
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
                    <Link to="/settings" className={styles.dropdownItem}>Settings</Link>
                    <Link to="/dashboard" className={styles.dropdownItem}>Dashboard</Link>
                    <Link to="/login" className={styles.dropdownItem} onClick={() => {
                      logout()
                      setDropdownOpen(false)
                    }}>Logout</Link>
                  </div>
                )}
              </div>
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