import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import ListView from '../../../../components/ListView/ListView';
import { CREATE_POLL_PAGE } from '../../../../routes/urls';
import { listPoll } from '../../../../apis/poll';

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
        <div>
          Loading...
        </div>
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
              <td>{item.title}</td>
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
