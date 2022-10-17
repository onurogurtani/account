import { api } from './api';

const getPackageList = () => {
  return api({
    url: `Packages/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const addPackage = (data) => {
  return api({
    url: `Packages`,
    method: 'POST',
    data,
  });
};

const updatePackage = (data) => {
  return api({
    url: `Packages`,
    method: 'PUT',
    data,
  });
};

const packageServices = {
  getPackageList,
  addPackage,
  updatePackage,
};

export default packageServices;
