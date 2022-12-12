import { api } from './api';

const getPackageTypeList = (urlString) => {
  return api({
    url: `PackageTypes/GetByFilterPagedPackageTypes${urlString}`,
    method: 'POST',
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
  getPackageTypeList,
  addPackageType,
  updatePackageType,
  deletePackageType,
};

export default packageTypeServices;
