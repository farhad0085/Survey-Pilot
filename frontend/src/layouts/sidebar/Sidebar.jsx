import React from 'react'
import styles from './styles.module.scss'
import logo from '../../assets/icons/logo.png'
import { getFullName, getInitials } from '../../utils/auth'
import { useAuth } from '../../contexts/AuthContext'
import { CREATE_POLL_PAGE, CREATE_SURVEY_PAGE, CREATE_USER_PAGE, DASHBOARD_PAGE, LIST_POLL_PAGE, LIST_SURVEY_PAGE, LIST_USER_PAGE } from '../../routes/urls'
import { useHistory } from 'react-router-dom'

const Sidebar = () => {
  const { user, logout } = useAuth();
  const history = useHistory()

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
          <li className={styles.menuItem} onClick={() => history.push(DASHBOARD_PAGE)}>Dashboard</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Poll
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem} onClick={() => history.push(LIST_POLL_PAGE)}>Polls</li>
          <li className={styles.menuItem} style={{ color: "#878787" }} onClick={() => history.push(CREATE_POLL_PAGE)}>+ Add new poll</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Survey
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem} onClick={() => history.push(LIST_SURVEY_PAGE)}>Surveys</li>
          <li className={styles.menuItem} style={{ color: "#878787" }} onClick={() => history.push(CREATE_SURVEY_PAGE)}>+ Add new survey</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Team
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem} onClick={() => history.push(LIST_USER_PAGE)}>Users</li>
          <li className={styles.menuItem} style={{ color: "#878787" }} onClick={() => history.push(CREATE_USER_PAGE)}>+ Add new user</li>
        </div>
      </div>

      <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>
          Settings
        </div>
        <div className={styles.menuItems}>
          <li className={styles.menuItem}>Settings</li>
          <li className={styles.menuItem} onClick={logout}>Logout</li>
        </div>
      </div>

    </div>
  )

}


export default Sidebar