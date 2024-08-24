import React, { useEffect, useState } from 'react';
import { buildUpdatePollPageUrl, CREATE_POLL_PAGE } from '../../../../routes/urls';
import { listPoll } from '../../../../apis/poll';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ListPollPage = () => {

  const navigateTo = useNavigate()
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
    <>
      {loading ? (
        <>Loading...</>
      ) : (


        <div>
          <div>
            <h1>Polls</h1>
            <button onClick={() => navigateTo(CREATE_POLL_PAGE)}>
              Add New
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Vote Count</th>
                <th>Max Vote</th>
                <th>Publish At</th>
                <th>Created At</th>
                <th>Expire At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {polls.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><Link to={buildUpdatePollPageUrl(item.id)}>{item.title}</Link></td>
                  <td>{item.vote_count}</td>
                  <td>{item.max_vote || "N/A"}</td>
                  <td>{item.publish_at ? moment(item.publish_at).format("DD-MM-YYYY hh:mm a") : '-'}</td>
                  <td>{item.created_at ? moment(item.created_at).format("DD-MM-YYYY hh:mm a") : '-'}</td>
                  <td>{item.expire_at ? moment(item.expire_at).format("DD-MM-YYYY hh:mm a") : '-'}</td>
                  <td>{item.is_active ? "Active" : "Closed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ListPollPage;
