import React from 'react';
import styles from "./styles.module.scss";
import DashboardLayout from '../../layouts/DashboardLayout';
import { LIST_POLL_PAGE } from '../../routes/urls';

const DashboardPage = ({ history }) => {

  const data = [
    { title: "Polls", count: 6, link: LIST_POLL_PAGE },
    { title: "Surveys", count: 5 },
    { title: "Users", count: 6 },
  ];

  return (
    <DashboardLayout>
      <div className={styles.cardContainer}>
        {data.map((item, index) => (
          <div key={index} className={styles.card} onClick={() => history.push(item.link)}>
            <h2>{item.count}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
