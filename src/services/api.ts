import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { dropToken, getToken } from './token';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      config.headers.set('X-Token', token);
    }

    return config;
  });

  return api;
};

export const setUnauthorizedHandler = (api: AxiosInstance, onUnauthorized: () => void): void => {
  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
        onUnauthorized();
      }

      return Promise.reject(error);
    }
  );
};
