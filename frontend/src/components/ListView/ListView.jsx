import React from 'react'
import { useHistory } from 'react-router-dom';
import styles from "./styles.module.scss";


const ListView = ({ title, createLink, data, renderHeaderRow, renderDataRow }) => {

  const history = useHistory()

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <button className={styles.createButton} onClick={() => history.push(createLink)}>
          Add New
        </button>
      </div>
      <table className={styles.pollTable}>
        <thead>
          {renderHeaderRow()}
        </thead>
        <tbody>
          {data.map((item) => renderDataRow(item))}
        </tbody>
      </table>
    </div>
  )

}

export default ListView