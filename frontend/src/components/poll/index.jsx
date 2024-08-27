import React, { useState } from 'react';
import { submitPoll } from 'apis/poll';
import { showErrorMessage } from 'utils/toast';
import {
  Typography,
  Container,
  Button,
  Box,
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

const Poll = ({ pollData }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState(pollData)

  const totalVotes = poll.choices?.reduce((sum, choice) => sum + choice.vote_count, 0);

  const validationSchema = Yup.object().shape({
    choice: Yup.string().required('Please select an option'),
    email: poll.collect_email ? Yup.string().email('Invalid email address').required('Email is required') : Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      poll: poll.id,
      choice: values.choice,
      email: values.email || null,
    };

    submitPoll(poll.id, data)
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
      {!poll.can_vote && (
        <Box textAlign="center" sx={{ my: 4 }}>
          <Typography variant="h6" color="textSecondary">
            Voting is disabled for this poll.
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
                          disabled={!poll.can_vote}
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
                          <Typography variant="caption" sx={{ userSelect: 'none' }}>{choice.vote_count} votes</Typography>
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
                    disabled={!poll.can_vote}
                  />
                )}
              </Field>
            )}
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting || !poll.can_vote}
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )

}


export default Poll