import { api } from './api';

const getContractType = (data = {}) => {
  return api({
    url: `Crm/ContractTypes/GetByFilterPagedContractTypes`,
    method: 'POST',
    data: data,
  });
};

const getContractTypeAll = (
  data = null,
  params = {
    PageSize: 0,
  },
) => {
  return api({
    url: `Crm/ContractTypes/getList`,
    method: 'POST',
    data,
    params,
  });
}
const addContractType = (data = {}) => {
  return api({
    url: `/Crm/ContractTypes/Add`,
    method: 'POST',
    data: data,
  });
};
const updateContractType = (data = {}) => {
  return api({
    url: `/Crm/ContractTypes/Update`,
    method: 'PUT',
    data: data,
  });
};
const contractTypeServices = {
  getContractType,
  updateContractType,
  addContractType,
  getContractTypeAll
};

export default contractTypeServices;
