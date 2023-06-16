import { request } from '~/utils';

export const getArticles = async (params = {}) => {
  const options = {
    url: `/public/articles`,
    method: `GET`,
    params,
  };

  return request(options);
};

export const getArticle = async (id) => {
  const options = {
    url: `/public/articles/${id}`,
    method: `GET`,
  };

  return request(options);
};
