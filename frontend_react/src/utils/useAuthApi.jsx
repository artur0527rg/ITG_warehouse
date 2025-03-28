import axios from 'axios'
import { useAuth } from '../contexts/AuthProvider'

const useAuthApi = () => {
  const { token } = useAuth()
  const BASE_URL = process.env.API_URL + '/api'
  
  const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
  });

  apiClient.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  });

  return apiClient;
};

export default useAuthApi