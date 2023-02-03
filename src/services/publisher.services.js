import { api } from './api';
const getPublisherList = (params = {}) => {
  return api({
    url: 'Question/Publishers/getByFilterPagedPublishers',
    method: 'POST',
    data: null,
    params: params,
  });
};
const getPublisherAdd = (data) => {
  return api({
    url: 'Question/Publishers',
    method: 'POST',
    data: data,
  });
};
const getPublisherUpdate = (data) => {
  return api({
    url: 'Question/Publishers',
    method: 'PUT',
    data: data,
  });
};

const publisherServices = {
  getPublisherList,
  getPublisherAdd,
  getPublisherUpdate,
};

export default publisherServices;
