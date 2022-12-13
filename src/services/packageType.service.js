import { api } from './api';

const getByFilterPagedPackageTypes = (urlString) => {
  return api({
    url: `PackageTypes/GetByFilterPagedPackageTypes${urlString}`,
    method: 'POST',
  });
};

const getList = (data=[]) => {
  return api({
    url: `PackageTypes/getList`,
    method: 'POST',
    data
  });
};

const addPackageType = (data) => {
  return api({
    url: 'PackageTypes/Add',
    method: 'POST',
    data,
  });
};

const updatePackageType = (data) => {
  return api({
    url: 'PackageTypes/Update',
    method: 'PUT',
    data,
  });
};
const deletePackageType = (data) => {
  return api({
    url: `PackageTypes/Delete`,
    method: 'DELETE',
    data,
  });
};

const packageTypeServices = {
  getByFilterPagedPackageTypes,
  getList,
  addPackageType,
  updatePackageType,
  deletePackageType,
};

export default packageTypeServices;
