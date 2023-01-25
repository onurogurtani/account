import { api } from './api';

const getBranchs = (urlString) => {
  return api({
    url: `Mono/Branchs/GetByFilterPagedBranchs${urlString}`,
    method: 'POST',
  });
};

const addBranchs = (data) => {
  return api({
    url: 'Mono/Branchs',
    method: 'POST',
    data,
  });
};

const updateBranchs = (data) => {
  return api({
    url: 'Mono/Branchs',
    method: 'PUT',
    data,
  });
};
const deleteBranchs = (data) => {
  return api({
    url: `Mono/Branchs`,
    method: 'DELETE',
    data,
  });
};

const branchsServices = {
  getBranchs,
  addBranchs,
  updateBranchs,
  deleteBranchs,
};

export default branchsServices;
