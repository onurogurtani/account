import { api } from './api';

const getPackageList = (urlString) => {
  return api({
    url: `Packages/GetByFilterPagedPackages${urlString}`,
    method: 'POST',
  }); 
};


const getPackageById = (id) => {
  return api({
    url: `Packages/getbyid?Id=${id}`,
    method: 'GET',
  });
};

const addPackage = (data) => {

  return api({
    url: `Packages/Add`,
    method: 'POST',
    data
  });
};

const updatePackage = (data) => {
  return api({
    url: `Packages/Update`,
    method: 'PUT',
    data,
  });
};

const packageServices = {
  getPackageList,
  addPackage,
  updatePackage,
  getPackageById,
};

export default packageServices;
