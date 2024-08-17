import React, { useState } from 'react';
import { createPoll } from '../api';

const Polls = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [expirationDate, setExpirationDate] = useState('');

  const handleAddOption = () => setOptions([...options, '']);

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPoll({ question, options, expirationDate });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleChangeOption(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <input
          type="datetime-local"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default Polls;
