import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../provider/Authprovider';

// Create the secure instance once
export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(authContext);

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup on unmount to prevent memory leaks
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default UseAxiosSecure;//this is not add in this time
