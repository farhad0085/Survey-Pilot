import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LIST_POLL_PAGE } from 'routes/urls';
import { createPoll, getPoll, updatePoll } from 'apis/poll';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { showErrorMessage, showSuccessMessage } from 'utils/toast';
import { convertDatetimeForInput, formatTimeToUTC } from 'utils/time';
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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';


const PollForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [loading, setLoading] = useState(false);
  const choiceRefs = useRef([]); // Ref to keep track of the choice input elements

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
      featured: 0,
      choices: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string(),
      publishAt: Yup.date().nullable(),
      expireAt: Yup.date().nullable(),
      maxVote: Yup.number().nullable(),
      choices: Yup.array().of(Yup.object().required('Choice is required')).min(2, 'At least 2 choices are required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const data = {
        ...values,
        publish_at: (values.publishAt && values.publishAt !== "Invalid date") ? formatTimeToUTC(values.publishAt) : null,
        expire_at: (values.expireAt && values.expireAt !== "Invalid date") ? formatTimeToUTC(values.expireAt) : null,
        collect_email: values.collectEmail,
        max_vote: values.maxVote || null,
        show_result: values.showResult,
        featured: values.featured,
      };
      try {
        const action = isEdit ? updatePoll(pollId, data) : createPoll(data);
        await action;
        showSuccessMessage(`Poll ${isEdit ? 'updated' : 'created'} successfully.`);
      }
      catch (error) {
        setErrors(error.response?.data)
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
            featured: pollDetails.featured ? 1 : 0,
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

    // Focus on the new choice input field
    setTimeout(() => {
      if (choiceRefs.current[formik.values.choices.length]) {
        choiceRefs.current[formik.values.choices.length].focus();
      }
    }, 0);
  };

  const removeChoice = (index) => {
    const newChoices = formik.values.choices.filter((_, i) => i !== index);
    formik.setFieldValue('choices', newChoices);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(formik.values.choices);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    formik.setFieldValue('choices', items);
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Do you want to feature the poll in homepage?</InputLabel>
                <Select
                  id="featured"
                  name="featured"
                  value={formik.values.featured}
                  onChange={formik.handleChange}
                  label="Do you want to feature the poll in homepage?"
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="choices">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {formik.values.choices.map((choice, index) => (
                        <Draggable key={index} draggableId={index.toString()} index={index}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                              display="flex"
                              alignItems="center"
                              mb={1}
                              p={1}
                              border={1}
                              borderColor="divider"
                              borderRadius={1}
                            >
                              {/* Drag handle icon */}
                              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                <DragOutlined size={24} />
                              </Box>
                              <TextField
                                fullWidth
                                value={choice.text}
                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                placeholder={`Choice ${index + 1}`}
                                inputRef={(ref) => (choiceRefs.current[index] = ref)}
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
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>

              <Button color='secondary' variant="outlined" size="small" sx={{ mt: 1 }} onClick={addNewChoice}>
                + Add Choice
              </Button>

              {formik.errors.choices && (
                <Typography sx={{ mt: 1 }} color="error">{formik.errors.choices}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={1}>
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
                  Close
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
