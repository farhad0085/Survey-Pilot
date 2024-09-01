// SurveyForm.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LIST_POLL_PAGE } from 'routes/urls';
import { createPoll, getPoll, updatePoll } from 'apis/poll';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { showErrorMessage, showSuccessMessage } from 'utils/toast';
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

// Initial choice object
const initialChoice = { text: '' };

const SurveyForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [loading, setLoading] = useState(false);
  const choiceRefs = useRef([]); // Ref to keep track of the choice input elements

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      questions: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      questions: Yup.array()
        .of(
          Yup.object().shape({
            text: Yup.string().required('Question text is required'),
            question_type: Yup.string().required('Question type is required'),
            choices: Yup.array().when('question_type', {
              is: 'MULTIPLE_CHOICE',
              then: Yup.array().of(Yup.object().shape({ text: Yup.string().required('Choice text is required') })).min(2, 'At least 2 choices are required'),
              otherwise: Yup.array().of(Yup.object().shape({ text: Yup.string() })),
            }),
          })
        )
        .required('At least one question is required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      const data = {
        ...values,
        questions: values.questions.map(q => ({
          ...q,
          choices: q.choices ? q.choices.map(c => c.text) : [],
        })),
      };
      try {
        const action = isEdit ? updatePoll(pollId, data) : createPoll(data);
        await action;
        showSuccessMessage(`Survey ${isEdit ? 'updated' : 'created'} successfully.`);
        navigate(LIST_POLL_PAGE);
      } catch (error) {
        setErrors(error.response?.data);
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
            questions: pollDetails.questions || [],
          });
          setLoading(false);
        })
        .catch((error) => {
          showErrorMessage("Couldn't get the survey data.");
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [isEdit, pollId]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formik.values.questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    formik.setFieldValue('questions', newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...formik.values.questions];
    newQuestions[questionIndex].choices[choiceIndex] = {
      ...newQuestions[questionIndex].choices[choiceIndex],
      text: value,
    };
    formik.setFieldValue('questions', newQuestions);
  };

  const addNewChoice = (index) => {
    const newQuestions = [...formik.values.questions];
    newQuestions[index].choices = [...(newQuestions[index].choices || []), initialChoice];
    formik.setFieldValue('questions', newQuestions);
    // Focus on the new choice input field
    setTimeout(() => {
      if (choiceRefs.current[index]) {
        choiceRefs.current[index].focus();
      }
    }, 0);
  };

  const removeChoice = (questionIndex, choiceIndex) => {
    const newQuestions = [...formik.values.questions];
    newQuestions[questionIndex].choices = newQuestions[questionIndex].choices.filter((_, i) => i !== choiceIndex);
    formik.setFieldValue('questions', newQuestions);
  };

  const onOptionsDragEnd = (result, questionIndex) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(formik.values.questions[questionIndex].choices);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    // reset item's index
    items.forEach((item, index) => {
      item.index = index
    })

    formik.setFieldValue(`questions[${questionIndex}].choices`, items);
  };

  const onQuestionDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(formik.values.questions);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    // reset item's index
    items.forEach((item, index) => {
      item.index = index
    })

    formik.setFieldValue('questions', items);
  };

  const handleAddQuestion = () => {
    formik.setFieldValue('questions', [...formik.values.questions, { text: '', question_type: 'TEXT', choices: [] }]);
  };

  const handleRemoveQuestion = (index) => {
    formik.setFieldValue('questions', formik.values.questions.filter((_, i) => i !== index));
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit Survey' : 'Create Survey'}
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
                style={{ height: '200px', marginBottom: '40px' }}
              />
              {formik.touched.description && formik.errors.description && (
                <Typography color="error">{formik.errors.description}</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Questions
              </Typography>
              <DragDropContext onDragEnd={(result) => onQuestionDragEnd(result)}>
                <Droppable droppableId={`droppable-questions`}>
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {formik.values.questions?.map((question, questionIndex) => (
                        <Draggable key={questionIndex} draggableId={`draggable-${questionIndex}`} index={questionIndex}>
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={questionIndex}
                              display="flex"
                              alignItems="center"
                              mb={1}
                              p={1}
                              border={1}
                              borderColor="divider"
                              borderRadius={1}
                            >
                              <Grid item xs={12}>
                                <Grid container spacing={2} alignItems="center">
                                  <Grid item xs={12} md={6}>
                                    <TextField
                                      fullWidth
                                      id={`questions.${questionIndex}.text`}
                                      name={`questions.${questionIndex}.text`}
                                      label={`Question ${questionIndex + 1}`}
                                      value={question.text}
                                      onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                                      error={formik.touched.questions?.[questionIndex]?.text && Boolean(formik.errors.questions?.[questionIndex]?.text)}
                                      helperText={formik.touched.questions?.[questionIndex]?.text && formik.errors.questions?.[questionIndex]?.text}
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                    <FormControl fullWidth>
                                      <InputLabel>Question Type</InputLabel>
                                      <Select
                                        id={`questions.${questionIndex}.question_type`}
                                        name={`questions.${questionIndex}.question_type`}
                                        value={question.question_type}
                                        onChange={(e) => handleQuestionChange(questionIndex, 'question_type', e.target.value)}
                                      >
                                        <MenuItem value="TEXT">Short Answer</MenuItem>
                                        <MenuItem value="PARAGRAPH">Paragraph</MenuItem>
                                        <MenuItem value="MULTIPLE_CHOICE">Multiple Choice</MenuItem>
                                        <MenuItem value="DROPDOWN">Dropdown</MenuItem>
                                        <MenuItem value="CHECKBOX">Checkbox</MenuItem>
                                        <MenuItem value="LINEAR_SCALE">Linear Scale</MenuItem>
                                        <MenuItem value="DATE">Date</MenuItem>
                                        <MenuItem value="TIME">Time</MenuItem>
                                        <MenuItem value="FILE_UPLOAD">File Upload</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={1}>
                                    <Button
                                      variant="outlined"
                                      color="error"
                                      onClick={() => handleRemoveQuestion(questionIndex)}
                                      fullWidth
                                    >
                                      Delete
                                    </Button>
                                  </Grid>
                                </Grid>

                                {['MULTIPLE_CHOICE', "DROPDOWN", "CHECKBOX"].includes(question.question_type) && (
                                  <Box mt={2}>
                                    <DragDropContext onDragEnd={(result) => onOptionsDragEnd(result, questionIndex)}>
                                      <Droppable droppableId={`droppable-${questionIndex}`}>
                                        {(provided) => (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {question.choices?.map((choice, choiceIndex) => (
                                              <Draggable key={choiceIndex} draggableId={`draggable-${choiceIndex}`} index={choiceIndex}>
                                                {(provided) => (
                                                  <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    display="flex"
                                                    alignItems="center"
                                                    mb={1}
                                                    p={1}
                                                    border={1}
                                                    borderColor="divider"
                                                    borderRadius={1}
                                                    bgcolor={"#F1F2F3"}
                                                  >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                                      <DragOutlined size={24} />
                                                    </Box>
                                                    <TextField
                                                      fullWidth
                                                      variant="outlined"
                                                      value={choice.text}
                                                      onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e.target.value)}
                                                      inputRef={el => (choiceRefs.current[choiceIndex] = el)}
                                                      label={`Choice ${choiceIndex + 1}`}
                                                      margin="normal"
                                                    />
                                                    <Button variant="outlined"
                                                      color="error"
                                                      onClick={() => removeChoice(questionIndex, choiceIndex)}
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
                                    <Button variant="outlined" onClick={() => addNewChoice(questionIndex)}>Add Choice</Button>
                                  </Box>
                                )}
                              </Grid>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
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

export default SurveyForm;
