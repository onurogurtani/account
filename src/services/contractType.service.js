import { api } from './api';

const getContractType = (data = {}) => {
  return api({
    url: `Crm/ContractTypes/GetByFilterPagedContractTypes`,
    method: 'POST',
    data: data,
  });
};
const getContractTypeAdd = (data = {}) => {
  return api({
    url: `/Crm/ContractTypes/Add`,
    method: 'POST',
    data: data,
  });
};
const getContractTypeUpdate = (data = {}) => {
  return api({
    url: `/Crm/ContractTypes/Update`,
    method: 'PUT',
    data: data,
  });
};
const contractTypeServices = {
  getContractType,
  getContractTypeUpdate,
  getContractTypeAdd,
};

export default contractTypeServices;
