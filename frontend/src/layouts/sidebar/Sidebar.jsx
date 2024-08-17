import React from 'react'
import styles from './styles.module.scss'
import logo from '../../assets/icons/logo.png'
import { getFullName, getInitials } from '../../utils/auth'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img alt="logo" src={logo} className={styles.logo} />
        <h2 className={styles.logoText}>SURVEY PILOT</h2>
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.userImg}>{getInitials(user)}</div>
        <div className={styles.userInfo}>
          <p className={styles.username}>{getFullName(user)}</p>
          <p className={styles.role}>Product Owner</p>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Menu
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem}>Dashboard</li>
          <li className={styles.menuItem}>My Tasks</li>
          <li className={styles.menuItem}>Notifications</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Projects
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem}>Dashboard UI Kit</li>
          <li className={styles.menuItem}>CRM System</li>
          <li className={styles.menuItem}>Website Redesign</li>
          <li className={styles.menuItem}>Communication Tool</li>
          <li className={styles.menuItem} style={{ color: "#878787" }}>+ Add new project</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Team
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem}>Designers</li>
          <li className={styles.menuItem}>Backend</li>
          <li className={styles.menuItem}>Frontend</li>
          <li className={styles.menuItem} style={{ color: "#878787" }}>+ Add new team</li>
        </div>
      </div>

    </div>
  )

}


export default Sidebar