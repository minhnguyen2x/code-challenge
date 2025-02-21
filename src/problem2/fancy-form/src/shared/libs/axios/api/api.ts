import { API_DOMAIN } from '@shared/constants/api';
import { setupApiInterceptors } from '@shared/libs/axios/api/api-interceptors';
import axios from 'axios';
import qs from 'qs';

export const aptviseApi = axios.create({
  paramsSerializer: (params: unknown) =>
    qs.stringify(params, { arrayFormat: 'repeat' }),
  baseURL: API_DOMAIN,
});

setupApiInterceptors(aptviseApi);
