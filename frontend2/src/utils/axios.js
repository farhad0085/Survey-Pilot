import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE
})

export default instance


export function getHeaders(additional) {
  const userToken = localStorage.getItem(import.meta.env.VITE_APP_AUTH_TOKEN_KEY);
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
