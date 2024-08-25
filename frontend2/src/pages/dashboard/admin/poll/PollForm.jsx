import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LIST_POLL_PAGE } from '../../../../routes/urls';
import { createPoll, getPoll, updatePoll } from '../../../../apis/poll';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { showErrorMessage, showSuccessMessage } from '../../../../utils/toast';
import { convertDatetimeForInput, formatTimeToUTC } from '../../../../utils/time';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from '@mui/material';

const PollForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      isActive: true,
      publishAt: '',
      expireAt: '',
      maxVote: '',
      collectEmail: 1,
      showResult: 1,
      choices: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string(),
      publishAt: Yup.date().nullable(),
      expireAt: Yup.date().nullable(),
      maxVote: Yup.number().nullable(),
      choices: Yup.array().of(Yup.object().required('Choice is required')),
    }),
    onSubmit: async (values) => {
      const data = {
        ...values,
        publish_at: values.publishAt ? formatTimeToUTC(values.publishAt) : null,
        expire_at: values.expireAt ? formatTimeToUTC(values.expireAt) : null,
        collect_email: values.collectEmail,
        show_result: values.showResult,
      };
      try {
        const action = isEdit ? updatePoll(pollId, data) : createPoll(data);
        await action;
        showSuccessMessage(`Poll ${isEdit ? 'updated' : 'created'} successfully.`);
      }
      catch (error) {
        showErrorMessage("Couldn't save the changes, please try again later.");

      }

    },
  });

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getPoll(pollId)
        .then((res) => {
          const pollDetails = res.data;
          formik.setValues({
            title: pollDetails.title || '',
            description: pollDetails.description || '',
            isActive: pollDetails.is_active,
            publishAt: convertDatetimeForInput(pollDetails.publish_at),
            expireAt: convertDatetimeForInput(pollDetails.expire_at),
            maxVote: pollDetails.max_vote || '',
            collectEmail: pollDetails.collect_email ? 1 : 0,
            showResult: pollDetails.show_result ? 1 : 0,
            choices: pollDetails.choices || [],
          });
          setLoading(false);
        })
        .catch((error) => {
          showErrorMessage("Couldn't get the poll's data");
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [isEdit, pollId]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...formik.values.choices];
    newChoices[index] = {
      ...newChoices[index],
      "index": index,
      "text": value
    };
    formik.setFieldValue('choices', newChoices);
  };

  const addNewChoice = () => {
    formik.setFieldValue('choices', [...formik.values.choices, {}]);
  };

  const removeChoice = (index) => {
    const newChoices = formik.values.choices.filter((_, i) => i !== index);
    formik.setFieldValue('choices', newChoices);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Poll' : 'Create Poll'}
      </Typography>
      {(isEdit && loading) ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <form noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <ReactQuill
                theme="snow"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue('description', value)}
                style={{ height: '200px', marginBottom: '60px' }}
              />
              {formik.touched.description && formik.errors.description && (
                <Typography color="error">{formik.errors.description}</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="publishAt"
                name="publishAt"
                label="Publish At"
                type="datetime-local"
                value={formik.values.publishAt}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="expireAt"
                name="expireAt"
                label="Expire At"
                type="datetime-local"
                value={formik.values.expireAt}
                onChange={formik.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="maxVote"
                name="maxVote"
                label="Maximum Allowed Vote"
                type="number"
                value={formik.values.maxVote}
                onChange={formik.handleChange}
                error={formik.touched.maxVote && Boolean(formik.errors.maxVote)}
                helperText={formik.touched.maxVote && formik.errors.maxVote}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Collect Email?</InputLabel>
                <Select
                  id="collectEmail"
                  name="collectEmail"
                  value={formik.values.collectEmail}
                  onChange={formik.handleChange}
                  label="Collect Email?"
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Show Poll Result After Submission?</InputLabel>
                <Select
                  id="showResult"
                  name="showResult"
                  value={formik.values.showResult}
                  onChange={formik.handleChange}
                  label="Show Poll Result After Submission?"
                >
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Choices
              </Typography>
              {formik.values.choices.map((choice, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <TextField
                    fullWidth
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    placeholder={`Choice ${index + 1}`}
                  />
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    color="error"
                    onClick={() => removeChoice(index)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
              <Button variant="contained" onClick={addNewChoice}>
                + Add Choice
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                  startIcon={formik.isSubmitting ? <CircularProgress size="1rem" /> : null}
                >
                  {formik.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(LIST_POLL_PAGE)}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Paper>
  );
};

export default PollForm;
