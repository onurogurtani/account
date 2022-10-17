import { api } from './api';

const getOperationClaimsList = () => {
  return api({
    url: `OperationClaims/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const addOperationClaims = (data) => {
  return api({
    url: `OperationClaims`,
    method: 'POST',
    data,
  });
};

const updateOperationClaims = (data) => {
  return api({
    url: `OperationClaims`,
    method: 'PUT',
    data,
  });
};

const deleteOperationClaims = ({ id }) => {
  return api({
    url: `OperationClaims?id=${id}`,
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
