import { api } from './api';

const getContractType = (data = {}) => {
  return api({
    url: `Mono/ContractTypes/GetByFilterPagedContractTypes`,
    method: 'POST',
    data: data,
  });
};
const getContractTypeAdd = (data = {}) => {
  return api({
    url: `/Mono/ContractTypes/Add`,
    method: 'POST',
    data: data,
  });
};
const getContractTypeUpdate = (data = {}) => {
  return api({
    url: `/Mono/ContractTypes/Update`,
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
