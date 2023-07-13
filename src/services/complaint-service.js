import { request } from '~/utils';

export const create = async (data = {}) => {
  const options = {
    url: `/complaints`,
    method: `POST`,
    data,
  };

  return request(options);
};

export const getInstitutions = async (params = {}) => {
  const options = {
    url: `/public/complaints/institutions/list`,
    method: `GET`,
    params,
  };

  return request(options);
};
