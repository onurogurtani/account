import { api } from './api';
const getPublisherBookList = (params = {}) => {
  return api({
    url: 'Mono/Books/getByFilterPagedBooks',
    method: 'POST',
    data: null,
    params: params,
  });
};
const getPublisherBookAdd = (data) => {
  return api({
    url: 'Mono/Books/AddRange',
    method: 'POST',
    data: data,
  });
};
const getPublisherBookUpdate = (data) => {
  return api({
    url: 'Mono/Books',
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
