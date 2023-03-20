import { api } from './api';

const getFilteredContractTypes = (data) => {
    return api({
        url: `Crm/ContractTypes/GetByFilterPagedContractTypes`,
        method: 'POST',
        data,
    });
};
const getByFilterPagedContractKinds = (data) => {
    return api({
        url: 'Crm/ContractKinds/GetByFilterPagedContractKinds',
        method: 'POST',
        data,
    });
};

const getByFilterPagedDocuments = (params) => {
    return api({
        url: 'Crm/Documents/getByFilterPagedDocuments',
        method: 'POST',
        params,
    });
};
const addNewContract = (data) => {
    return api({
        url: 'Crm/Documents',
        method: 'POST',
        data,
    });
};
const updateContract = (data) => {
    return api({
        url: 'Crm/Documents/UpdateDocument',
        method: 'PUT',
        data,
    });
};

const getVersionForContract = (id) => {
    return api({
        url: `Crm/Documents/getNewVersion?ContractKindId=${id}`,
        method: 'POST',
    });
};
const getVersionForCopiedContract = (data) => {
    return api({
        url: 'Crm/Documents/copyDocument',
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
