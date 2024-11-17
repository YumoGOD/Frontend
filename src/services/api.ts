import axios from 'axios';

const api = axios.create({
  baseURL: 'http://109.172.86.34/api/',
});

// Перехватчик запросов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post('http://95.142.46.28:8000/api/auth/refresh/', { refreshToken });

          if (response.data && response.data.access) {
            localStorage.setItem('accessToken', response.data.access);

            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
      }
    }

    return Promise.reject(error);
  }
);

export default api;
