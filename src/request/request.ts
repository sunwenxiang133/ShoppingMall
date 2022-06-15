import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

//拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (result) => {
    return result.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
