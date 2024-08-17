import axios from './utils/axios';

export const registerUser = (userData) => axios.post(`/register`, userData);
export const loginUser = (credentials) => axios.post(`/login`, credentials);
export const createPoll = (pollData) => axios.post(`/polls`, pollData);
export const createSurvey = (surveyData) => axios.post(`/surveys`, surveyData);
export const voteInPoll = (pollId, voteData) => axios.post(`/polls/${pollId}/vote`, voteData);
export const submitSurvey = (surveyId, responses) => axios.post(`/surveys/${surveyId}/responses`, responses);
export const getPollResults = (pollId) => axios.get(`/polls/${pollId}/results`);
export const getSurveyResults = (surveyId) => axios.get(`/surveys/${surveyId}/results`);
