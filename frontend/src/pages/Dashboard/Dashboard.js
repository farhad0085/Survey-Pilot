import React from 'react';
import styles from "./styles.module.scss";
import DashboardLayout from '../../layouts/DashboardLayout';

const DashboardPage = () => {

  const cards = [
    { title: "Polls", count: 6 },
    { title: "Surveys", count: 5 },
    { title: "Users", count: 6 },
  ];

  return (
    <DashboardLayout>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <h2>{card.count}</h2>
            <p>{card.title}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
