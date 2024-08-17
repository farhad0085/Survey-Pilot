import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
})

export default instance


export function getHeaders(additional) {
  const userToken = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY);
  const timezoneOffset = new Date().getTimezoneOffset();

  let headers = {
    ...additional,
    "X-Api-Timezone-Offset": timezoneOffset,
  };

  if (userToken) {
    headers["Authorization"] = `Token ${userToken}`;
  }
  return headers;
}
