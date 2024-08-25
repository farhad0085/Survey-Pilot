import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll, submitPoll } from 'apis/poll';
import { showErrorMessage } from 'utils/toast';
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Box,
  Paper, Grid,
  CircularProgress
} from '@mui/material';

const PollPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleChoiceClick = (choiceId) => {
    setHasVoted(false);

    const data = {
      poll: pollId,
      choice: choiceId,
    };

    submitPoll(pollId, data)
      .then(({ data }) => {
        setPoll(data);
        setHasVoted(true);
      })
      .catch(() => {
        showErrorMessage("Couldn't submit your vote, please try again.");
      });
  };

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

  const totalVotes = poll.choices?.reduce((sum, choice) => sum + choice.vote_count, 0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Makes sure the content is centered vertically
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              {poll.title}
            </Typography>
            <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: poll.description }} />
            <List>
            {poll.choices?.map((choice) => (
              <ListItem
                key={choice.id}
                button
                onClick={() => handleChoiceClick(choice.id)}
                disabled={hasVoted}
              >
                <Grid container alignItems="center">
                  <Grid item xs={7}>
                    <ListItemText primary={choice.text} />
                  </Grid>
                  {hasVoted && (
                    <Grid item xs={5}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={totalVotes > 0 ? (choice.vote_count / totalVotes) * 100 : 0}
                          />
                        </Box>
                        <Typography variant="caption">{choice.vote_count} votes</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </ListItem>
            ))}
          </List>
          </Container>
        )}
      </Paper>
    </Box>
  );
};

export default PollPage;
