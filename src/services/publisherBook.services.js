import { api } from './api';
const getPublisherBookList = (params = {}) => {
  return api({
    url: 'Books/getList',
    method: 'POST',
    data: null,
    params: params,
  });
};
const getPublisherBookAdd = (data) => {
  return api({
    url: 'Books/AddRange',
    method: 'POST',
    data: data,
  });
};
const getPublisherBookUpdate = (data) => {
  return api({
    url: 'Books',
    method: 'PUT',
    data: data,
  });
};

const publisherServices = {
  getPublisherBookList,
  getPublisherBookAdd,
  getPublisherBookUpdate,
};

export default publisherServices;
