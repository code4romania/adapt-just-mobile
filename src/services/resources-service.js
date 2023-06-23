import { request } from '~/utils';

export const getResources = async (type = '') => {
  const params = { type };

  const options = {
    url: `/public/resources/${type}`,
    method: `GET`,
    params,
  };

  return request(options);
};

export const getResource = async (id = null) => {
  const options = {
    url: `/public/resources/${id}/show`,
    method: `GET`,
  };

  return request(options);
};
