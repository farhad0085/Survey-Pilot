import axios, { getHeaders } from '../utils/axios';

export const listPoll = async () => {
  return await axios.get(`/api/poll/polls`, { headers: getHeaders() });
}

export const getPoll = async (pollId) => {
  return await axios.get(`/api/poll/polls/${pollId}`, { headers: getHeaders() });
}

export const createPoll = async (pollData) => {
  return await axios.post(`/api/poll/polls/`, pollData, { headers: getHeaders() });
}

export const updatePoll = async (pollId, pollData) => {
  return await axios.post(`/api/poll/polls/${pollId}`, pollData, { headers: getHeaders() });
}
