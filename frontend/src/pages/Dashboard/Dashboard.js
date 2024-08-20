import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";
import DashboardLayout from '../../layouts/DashboardLayout';
import { LIST_POLL_PAGE, LIST_SURVEY_PAGE, LIST_USER_PAGE } from '../../routes/urls';
import { getDashboardData } from '../../apis/auth';
import { showErrorMessage } from '../../utils/toast';
import Loader from '../../components/Loader';

const DashboardPage = ({ history }) => {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getDashboardData()
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(error => {
        showErrorMessage()
        setLoading(false)
      })
  }, [])
  
  return (
    <DashboardLayout>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.cardContainer}>
          <div className={styles.card} onClick={() => history.push(LIST_POLL_PAGE)}>
            <h2>{data?.cards?.polls}</h2>
            <p>Polls</p>
          </div>
          <div className={styles.card} onClick={() => history.push(LIST_SURVEY_PAGE)}>
            <h2>{data?.cards?.surveys}</h2>
            <p>Surveys</p>
          </div>
          <div className={styles.card} onClick={() => history.push(LIST_USER_PAGE)}>
            <h2>{data?.cards?.users}</h2>
            <p>Users</p>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};

export default DashboardPage;
