import React from 'react'
import styles from './styles.module.scss';
import Sidebar from './sidebar/Sidebar';
import { ToastContainer } from 'react-toastify'


const DashboardLayout = ({ children }) => {

  return (
    <div className={styles.container}>
      
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