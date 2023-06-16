import { request } from '~/utils';

export const create = async (data = {}) => {
  const options = {
    url: `/complaints`,
    method: `POST`,
    data,
  };

  return request(options);
};
