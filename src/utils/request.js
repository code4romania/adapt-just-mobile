import axios from 'axios';
import { API_URL } from '@env';

const createClient = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'dataType': `json`,
      'Accept': `application/json`,
      'Content-Type': `multipart/form-data`,
    },
  });
}

const request = async (options) => {
  const client = createClient();

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
