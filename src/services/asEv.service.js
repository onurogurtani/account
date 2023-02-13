import { api } from './api';

const getVideoNames = () => {
  return api({
    url: `/Exam/AsEvs/getVideoNames`,
    method: 'GET',
  });
};

const getCreatedNames = () => {
  return api({
    url: `/Exam/AsEvs/getCreatedNames`,
    method: 'GET',
  });
};
const adAsEv = (data) => {
  return api({
    url: `/Exam/AsEvs`,
    method: 'POST',
    data,
  });
};

const getFilterPagedAsEvs = (params) => {
  return api({
    url: `/Exam/AsEvs/getByFilterPagedAsEvs`,
    method: 'POST',
    params,
  });
};
const deleteAsEv = (data) => {
  return api({
    url: `/Exam/AsEvs?Id=${data}`,
    method: 'DELETE',
    // data,
  });
};

const asEvServices = {
  getVideoNames,
  getCreatedNames,
  adAsEv,
  getFilterPagedAsEvs,
  deleteAsEv,
};

export default asEvServices;
