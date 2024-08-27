import axios, { getHeaders } from '../utils/axios';

export const listPoll = async () => {
  return await axios.get(`/api/poll/polls/`, { headers: getHeaders() });
}

export const listFeaturedPoll = async () => {
  return await axios.get(`/api/poll/featured-polls/`, { headers: getHeaders() });
}

export const getPoll = async (pollId) => {
  return await axios.get(`/api/poll/polls/${pollId}/`, { headers: getHeaders() });
}

export const createPoll = async (pollData) => {
  return await axios.post(`/api/poll/polls/`, pollData, { headers: getHeaders() });
}

export const updatePoll = async (pollId, pollData) => {
  return await axios.put(`/api/poll/polls/${pollId}/`, pollData, { headers: getHeaders() });
}

export const submitPoll = async (pollId, pollData) => {
  return await axios.post(`/api/poll/vote/`, pollData);
}

export const getPollAnalytics = async (pollId, page, pageSize) => {
  return await axios.get(`/api/poll/polls/${pollId}/analytics?page=${page}&page_size=${pageSize}`, { headers: getHeaders() });
}
