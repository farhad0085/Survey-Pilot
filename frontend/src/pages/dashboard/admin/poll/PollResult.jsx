import React, { useEffect, useState } from 'react';
import { getPoll, getPollAnalytics } from '../../../../apis/poll';
import { showErrorMessage } from 'utils/toast';
import MainCard from 'components/MainCard';
import {
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BarChart from './BarChart';
import AnalyticsTable from './PollAnalytics';

const PollResultPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPoll(pollId)
      .then(res => {
        setPoll(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        showErrorMessage("Couldn't load poll data, please try again later!");
      });

    setAnalyticsLoading(true);
    getPollAnalytics(pollId)
      .then(res => {
        setAnalytics(res.data);
        setAnalyticsLoading(false);
      })
      .catch(error => {
        setAnalyticsLoading(false);
        showErrorMessage("Couldn't load analytical data, please try again later!");
      });
  }, [pollId]);

  if (loading) {
    return (
      <MainCard title="Poll Result">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (!poll) {
    return (
      <MainCard title="Poll Result">
        <Typography variant="body1" component="div">
          No poll data available.
        </Typography>
      </MainCard>
    );
  }

  // Calculate total votes to normalize progress bars
  const totalVotes = poll.choices?.reduce((total, choice) => total + choice.vote_count, 0);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h5" component="h1">
          Poll Details
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {poll.title}
            </Typography>
            <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: poll.description }} />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Choice</TableCell>
                  <TableCell align="right">Votes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {poll.choices.map(choice => (
                  <TableRow key={choice.id}>
                    <TableCell>{choice.text}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {choice.vote_count}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={totalVotes === 0 ? 0 : (choice.vote_count / totalVotes) * 100}
                            sx={{ height: 10, borderRadius: 5 }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, height: '100%' }}>
            <Typography variant="h5">Votes</Typography>
            <BarChart data={poll.choices} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
         <AnalyticsTable analytics={analytics} analyticsLoading={analyticsLoading} />
        </Grid>
      </Grid>
    </>
  );
};

export default PollResultPage;
