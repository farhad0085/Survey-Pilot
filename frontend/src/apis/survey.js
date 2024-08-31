import axios, { getHeaders } from '../utils/axios';

export const listSurvey = async (page, pageSize) => {
  return await axios.get(`/api/survey/surveys/?page=${page}&page_size=${pageSize}`, { headers: getHeaders() });
}

export const listFeaturedSurvey = async () => {
  return await axios.get(`/api/survey/featured-polls/`, { headers: getHeaders() });
}

export const getSurvey = async (pollId) => {
  return await axios.get(`/api/survey/surveys/${pollId}/`, { headers: getHeaders() });
}

export const createSurvey = async (pollData) => {
  return await axios.post(`/api/survey/surveys/`, pollData, { headers: getHeaders() });
}

export const updateSurvey = async (pollId, pollData) => {
  return await axios.put(`/api/survey/surveys/${pollId}/`, pollData, { headers: getHeaders() });
}

export const submitSurvey = async (pollId, pollData) => {
  return await axios.post(`/api/survey/vote/`, pollData);
}

export const getSurveyAnalytics = async (pollId, page, pageSize) => {
  return await axios.get(`/api/survey/surveys/${pollId}/analytics?page=${page}&page_size=${pageSize}`, { headers: getHeaders() });
}
