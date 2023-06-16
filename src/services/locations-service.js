import { request } from '~/utils';

export const getLocations = async (params = {}) => {
  const options = {
    url: `/public/locations`,
    method: `GET`,
    params,
  };

  return request(options);
};
