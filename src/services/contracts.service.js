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

const contractsServices = {
    getFilteredContractTypes,
    getByFilterPagedContractKinds,
    getByFilterPagedDocuments,
    addNewContract,
    updateContract,
};

export default contractsServices;
