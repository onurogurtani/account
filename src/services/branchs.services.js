import { api } from './api';

const getBranchs = (urlString) => {
  return api({
    url: `Shared/Branchs/GetByFilterPagedBranchs${urlString}`,
    method: 'POST',
  });
};

const addBranchs = (data) => {
  return api({
    url: 'Shared/Branchs',
    method: 'POST',
    data,
  });
};

const updateBranchs = (data) => {
  return api({
    url: 'Shared/Branchs',
    method: 'PUT',
    data,
  });
};
const deleteBranchs = (data) => {
  return api({
    url: `Shared/Branchs`,
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
