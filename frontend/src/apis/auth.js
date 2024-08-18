import axios, { getHeaders } from '../utils/axios';

export const registerUser = (userData) => axios.post(`/register`, userData);
export const loginUser = (credentials) => axios.post(`/api/auth/login/`, credentials);
export const userInfo = () => axios.get("/api/auth/user/me", {headers: getHeaders()});
