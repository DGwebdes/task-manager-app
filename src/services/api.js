import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:3000/'
});

//Interceptor to include the tokens in requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
    (response) => {
        return response
    }, (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            // window.location.href = '/login';
        }
        return Promise.reject(error)
    }
);

export default API;
