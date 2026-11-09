import axios from 'axios';
import { Platform } from 'react-native';
import { API_URL } from '@env';
import { assertApiRequestAllowed, resolveApiUrl } from './api-config';
import { isStaging } from './app-environment';

const createClient = (method = 'GET') => {
  return axios.create({
    baseURL: resolveApiUrl(API_URL, Platform.OS, __DEV__, isStaging),
    ...(isStaging && method.toUpperCase() === 'GET' ? { timeout: 15000 } : {}),
    headers: {
      'dataType': `json`,
      'Accept': `application/json`,
      'Content-Type': `multipart/form-data`,
    },
  });
}

const request = async (options) => {
  assertApiRequestAllowed(options, __DEV__, isStaging);
  const client = createClient(options.method);

  const onSuccess = ({ data }) => data;

  const onError = (error) => {
    if (!axios.isCancel(error)) {
      return Promise.reject(error.response || error.message);
    }
  }

  try {
    const result = await client(options);
    return onSuccess(result);
  } catch (error) {
    return onError(error);
  }
};

export default request;
