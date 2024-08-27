import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll } from 'apis/poll';
import { showErrorMessage } from 'utils/toast';
import {
  CircularProgress,
  Box,
  Paper,
} from '@mui/material';
import Poll from 'components/poll';

const PollPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPoll(pollId)
      .then(({ data }) => {
        setPoll(data);
        setLoading(false);
      })
      .catch(() => {
        showErrorMessage('Error fetching poll data');
        setLoading(false);
      });
  }, [pollId]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Poll pollData={poll} />
        )}
      </Paper>
    </Box>
  );
};

export default PollPage;
