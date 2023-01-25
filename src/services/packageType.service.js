import { api } from './api';

const getByFilterPagedPackageTypes = (urlString) => {
  return api({
    url: `Mono/PackageTypes/GetByFilterPagedPackageTypes${urlString}`,
    method: 'POST',
  });
};

const getList = (data = []) => {
  return api({
    url: `Mono/PackageTypes/getList`,
    method: 'POST',
    data,
  });
};

const addPackageType = (data) => {
  return api({
    url: 'Mono/PackageTypes/Add',
    method: 'POST',
    data,
  });
};

const updatePackageType = (data) => {
  return api({
    url: 'Mono/PackageTypes/Update',
    method: 'PUT',
    data,
  });
};
const deletePackageType = (data) => {
  return api({
    url: `Mono/PackageTypes/Delete`,
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
