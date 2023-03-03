import { api } from './api';

const getOperationClaimsList = (data = null, params = { PageSize: 0 }) => {
    return api({
        url: `Identity/OperationClaims/getList`,
        method: 'POST',
        data,
        params,
    });
};

const operationClaimsServices = {
    getOperationClaimsList,
};

export default operationClaimsServices;
