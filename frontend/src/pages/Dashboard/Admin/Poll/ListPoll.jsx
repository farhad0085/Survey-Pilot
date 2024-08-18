import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import ListView from '../../../../components/ListView/ListView';
import { buildUpdatePollPageUrl, CREATE_POLL_PAGE } from '../../../../routes/urls';
import { listPoll } from '../../../../apis/poll';
import { Link } from 'react-router-dom'
import Loader from '../../../../components/Loader';

const ListPollPage = () => {

  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    listPoll().then(res => {
      setPolls(res.data)
      setLoading(false)
    })
      .catch(error => {
        setLoading(false)
      })
  }, [])

  return (
    <DashboardLayout>
      {loading ? (
        <Loader />
      ) : (
        <ListView
          data={polls}
          title={"Polls"}
          createLink={CREATE_POLL_PAGE}
          renderHeaderRow={() => (
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Votes</th>
              <th>Created At</th>
              <th>Status</th>
            </tr>
          )}
          renderDataRow={item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><Link to={buildUpdatePollPageUrl(item.id)}>{item.title}</Link></td>
              <td>{item.votes}</td>
              <td>{item.created_at}</td>
              <td>{item.status}</td>
            </tr>
          )}
        />
      )}
    </DashboardLayout>
  );
};

export default ListPollPage;
