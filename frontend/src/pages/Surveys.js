import React, { useState } from 'react';
import { createSurvey } from '../api';

const Surveys = () => {
  const [questions, setQuestions] = useState([{ text: '', type: 'multiple_choice', options: [''] }]);

  const handleAddQuestion = () => setQuestions([...questions, { text: '', type: 'multiple_choice', options: [''] }]);

  const handleChangeQuestion = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleChangeOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSurvey({ questions });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Survey</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              placeholder="Question Text"
              value={question.text}
              onChange={(e) => handleChangeQuestion(qIndex, 'text', e.target.value)}
              required
            />
            {question.type === 'multiple_choice' && question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={option}
                onChange={(e) => handleChangeOption(qIndex, oIndex, e.target.value)}
                required
              />
            ))}
            <button type="button" onClick={() => setQuestions(questions.map((q, index) => index === qIndex ? { ...q, options: [...q.options, ''] } : q))}>
              Add Option
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default Surveys;
