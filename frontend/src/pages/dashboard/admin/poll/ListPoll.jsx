import React, { useEffect, useState } from 'react';
import { buildPollPageUrl, buildPollResultPageUrl, buildUpdatePollPageUrl, CREATE_POLL_PAGE } from '../../../../routes/urls';
import { listPoll } from '../../../../apis/poll';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import moment from 'moment'
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from '@mui/material';
import { ExportOutlined } from '@ant-design/icons';

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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h5" component="h1">
          Polls
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigateTo(CREATE_POLL_PAGE)}>
          Add New
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Vote Count</TableCell>
                <TableCell>Max Vote</TableCell>
                <TableCell>Publish At</TableCell>
                <TableCell>Expire At</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Preview</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {polls.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <Link component={RouterLink} to={buildUpdatePollPageUrl(item.id)}>
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>{item.vote_count}</TableCell>
                  <TableCell>{item.max_vote || 'N/A'}</TableCell>
                  <TableCell>{item.publish_at ? moment(item.publish_at).format('DD-MM-YYYY hh:mm a') : '-'}</TableCell>
                  <TableCell>{item.expire_at ? moment(item.expire_at).format('DD-MM-YYYY hh:mm a') : '-'}</TableCell>
                  <TableCell>{item.is_active ? 'Active' : 'Closed'}</TableCell>
                  <TableCell>{item.updated_at ? moment(item.updated_at).format('DD-MM-YYYY hh:mm a') : '-'}</TableCell>
                  <TableCell>
                    <Button
                      component={'a'}
                      target='_blank'
                      href={buildPollPageUrl(item.id)}
                      variant="contained"
                      sx={{ textTransform: 'uppercase' }}
                      endIcon={<ExportOutlined />}
                      color='info'
                    >
                      Open it
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => navigateTo(buildPollResultPageUrl(item.id))}
                      sx={{ textTransform: 'uppercase' }}
                      endIcon={<ExportOutlined />}
                    >
                      View Result
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ListPollPage;
