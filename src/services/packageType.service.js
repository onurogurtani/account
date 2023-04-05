import { api } from './api';

const getByFilterPagedPackageTypes = (urlString) => {
    return api({
        url: `Account/PackageTypes/GetByFilterPagedPackageTypes${urlString}`,
        method: 'POST',
    });
};

const getList = (data = []) => {
    return api({
        url: `Account/PackageTypes/getList`,
        method: 'POST',
        data,
    });
};

const addPackageType = (data) => {
    return api({
        url: 'Account/PackageTypes/Add',
        method: 'POST',
        data,
    });
};

const updatePackageType = (data) => {
    return api({
        url: 'Account/PackageTypes/Update',
        method: 'PUT',
        data,
    });
};
const deletePackageType = (data) => {
    return api({
        url: `Account/PackageTypes/Delete`,
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
