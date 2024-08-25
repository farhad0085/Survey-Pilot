import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll, submitPoll } from 'apis/poll';
import { showErrorMessage } from 'utils/toast';
import {
  Typography,
  Container,
  Button,
  CircularProgress,
  Box,
  Paper,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CheckCircleOutlined } from '@ant-design/icons';

const PollPage = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

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

  const validationSchema = Yup.object().shape({
    choice: Yup.string().required('Please select an option'),
    email: poll.collect_email ? Yup.string().email('Invalid email address').required('Email is required') : Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      poll: pollId,
      choice: values.choice,
      email: values.email || null,
    };

    submitPoll(pollId, data)
      .then(({ data }) => {
        setPoll(data);
        setHasVoted(true);
      })
      .catch(() => {
        showErrorMessage("Couldn't submit your vote, please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

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
          <Container>
            <Typography variant="h4" component="h1" gutterBottom>
              {poll.title}
            </Typography>
            <Typography variant="body1" component="div" dangerouslySetInnerHTML={{ __html: poll.description }} />
            {hasVoted && (
              <Box textAlign="center" sx={{ mt: 4, mb: 4 }}>
                <CheckCircleOutlined style={{ fontSize: 60, color: 'green' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Thank you for your submission!
                </Typography>
              </Box>
            )}
            <Formik
              initialValues={{ choice: '', email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Field name="choice">
                    {({ field }) => (
                      <RadioGroup {...field}>
                        {poll.choices?.map((choice) => (
                          <Grid container alignItems="center">
                            <Grid item xs={6}>
                              <FormControlLabel
                                key={choice.id}
                                value={choice.id}
                                control={<Radio />}
                                label={choice.text}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ flexGrow: 1, mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={totalVotes > 0 ? (choice.vote_count / totalVotes) * 100 : 0}
                                  />
                                </Box>
                                <Typography variant="caption">{choice.vote_count} votes</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        ))}
                      </RadioGroup>
                    )}
                  </Field>
                  {errors.choice && touched.choice ? (
                    <Typography variant="caption" color="error">{errors.choice}</Typography>
                  ) : null}

                  {poll.collect_email && (
                    <Field name="email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          fullWidth
                          sx={{ mt: 2 }}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      )}
                    </Field>
                  )}
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting || loading}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>

          </Container>
        )}
      </Paper>
    </Box>
  );
};

export default PollPage;
