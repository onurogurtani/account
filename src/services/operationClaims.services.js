import { api } from './api';

const getOperationClaimsList = (data = null, params = { PageSize: 0 }) => {
    return api({
        url: `Identity/OperationClaims/getList`,
        method: 'POST',
        data,
        params,
    });
};

const addOperationClaims = (data) => {
    return api({
        url: `Identity/OperationClaims`,
        method: 'POST',
        data,
    });
};

const updateOperationClaims = (data) => {
    return api({
        url: `Identity/OperationClaims`,
        method: 'PUT',
        data,
    });
};

const deleteOperationClaims = ({ id }) => {
    return api({
        url: `Identity/OperationClaims?id=${id}`,
        method: 'DELETE',
    });
};

const operationClaimsServices = {
    getOperationClaimsList,
    addOperationClaims,
    deleteOperationClaims,
    updateOperationClaims,
};

export default operationClaimsServices;
