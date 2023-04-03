import { api } from './api';

const getByFilterPagedPackages = (params) => {
    return api({
        url: `Account/Packages/GetByFilterPagedPackages`,
        method: 'POST',
        params,
    });
};

const getPackageById = (id) => {
    return api({
        url: `Account/Packages/getbyid?Id=${id}`,
        method: 'GET',
    });
};

const addPackage = (data) => {
    return api({
        url: `Account/Packages/Add`,
        method: 'POST',
        data,
    });
};

const updatePackage = (data) => {
    return api({
        url: `Account/Packages/Update`,
        method: 'PUT',
        data,
    });
};
const getPackageNames = () => {
    return api({
        url: `Account/Packages/getPackageNames`,
        method: 'GET',
    });
};

const packageServices = {
    getByFilterPagedPackages,
    addPackage,
    updatePackage,
    getPackageById,
    getPackageNames,
};

export default packageServices;
