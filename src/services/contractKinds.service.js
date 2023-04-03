import { api } from './api';

const getContractKinds = (data = {}) => {
    return api({
        url: `Account/ContractKinds/GetByFilterPagedContractKinds`,
        method: 'POST',
        data: data,
    });
};
const getContractKindsByContractTypes = (data = {}) => {
    return api({
        url: `Account/ContractKinds/getContractKindsByContractTypes`,
        method: 'POST',
        params: data,
    });
};
const addContractKinds = (data = {}) => {
    return api({
        url: `/Account/ContractKinds/Add`,
        method: 'POST',
        data: data,
    });
};
const updateContractKinds = (data = {}) => {
    return api({
        url: `/Account/ContractKinds/Update`,
        method: 'PUT',
        data: data,
    });
};
const ContractKindservices = {
    getContractKinds,
    getContractKindsByContractTypes,
    updateContractKinds,
    addContractKinds,
};

export default ContractKindservices;
