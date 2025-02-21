import { AxiosInstance } from 'axios';

export const setupApiInterceptors = (apiInstance: AxiosInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
  );
};
