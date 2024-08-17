import React, { useState, useEffect } from 'react';
import { getPollResults, getSurveyResults } from '../api';

const Admin = () => {
  const [polls, setPolls] = useState([]);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch polls and surveys from API
    const fetchData = async () => {
      try {
        const pollResponse = await getPollResults();
        const surveyResponse = await getSurveyResults();
        setPolls(pollResponse.data);
        setSurveys(surveyResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Polls</h3>
        <ul>
          {polls.map(poll => (
            <li key={poll.id}>
              {poll.question} - <a href={`/results/poll/${poll.id}`}>View Results</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Surveys</h3>
        <ul>
          {surveys.map(survey => (
            <li key={survey.id}>
              {survey.title} - <a href={`/results/survey/${survey.id}`}>View Results</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
