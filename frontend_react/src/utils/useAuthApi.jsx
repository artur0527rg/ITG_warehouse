import axios from 'axios'
import { useAuth } from '../contexts/AuthProvider'

const useAuthApi = () => {
  const { token } = useAuth()
  
  const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
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