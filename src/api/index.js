import axios from 'axios';
import storage from '../services/storageService';

const { REACT_APP_API_BASE_URL } = process.env;

const api = axios.create({ baseURL: REACT_APP_API_BASE_URL })

api.interceptors.request.use(request => {
  let user = storage?.get("user");
  request.headers = { "Content-Type": "application/json", ...request.headers }

  if (user && !request.url.includes('auth/login')) {
    // user = JSON.parse(user);
    if (user?.tokens?.access) {
      request.headers = { Authorization: `Bearer ${user.tokens.access}`, ...request.headers }
    }
  }
  return request
}, error => error)

api.interceptors.response.use(response => response.data, error => Promise.reject(error))

export default api
export * from './user'
export * from './error'
