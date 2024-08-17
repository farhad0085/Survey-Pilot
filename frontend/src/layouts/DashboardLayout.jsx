import React from 'react'
import styles from './styles.module.scss';
import Sidebar from './sidebar/Sidebar';


const DashboardLayout = ({ children }) => {

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Sidebar />

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )

}


export default DashboardLayout