import { request } from '~/utils';

export const uploadFile = async (data = {}) => {
  const options = {
    url: `/uploads`,
    method: `POST`,
    data,
  };

  return request(options);
};
