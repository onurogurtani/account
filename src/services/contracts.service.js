import { api } from './api';

const getFilteredContractTypes = (data) => {
    return api({
        url: `Account/ContractTypes/GetByFilterPagedContractTypes`,
        method: 'POST',
        data,
    });
};
const getByFilterPagedContractKinds = (data) => {
    return api({
        url: 'Account/ContractKinds/GetByFilterPagedContractKinds',
        method: 'POST',
        data,
    });
};

const getByFilterPagedDocuments = (params) => {
    return api({
        url: 'Account/Documents/getByFilterPagedDocuments',
        method: 'POST',
        params,
    });
};
const addNewContract = (data) => {
    return api({
        url: 'Account/Documents',
        method: 'POST',
        data,
    });
};
const updateContract = (data) => {
    return api({
        url: 'Account/Documents/UpdateDocument',
        method: 'PUT',
        data,
    });
};

const getVersionForContract = (id) => {
    return api({
        url: `Account/Documents/getNewVersion?ContractKindId=${id}`,
        method: 'POST',
    });
};
const getVersionForCopiedContract = (data) => {
    return api({
        url: 'Account/Documents/copyDocument',
        method: 'POST',
        data,
    });
};

const contractsServices = {
    getFilteredContractTypes,
    getByFilterPagedContractKinds,
    getByFilterPagedDocuments,
    addNewContract,
    updateContract,
    getVersionForContract,
    getVersionForCopiedContract,
};

export default contractsServices;
