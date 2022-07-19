import { api } from './api';

const getCurrentLoadBalance = ({ customerId }) => {
  return api({
    url: `LoadBalances/getCurrentLoadBalance?customerId=${customerId}`,
    method: 'GET',
  });
};

const getPreviousLoadBalance = (data) => {
  return api({
    url: `LoadBalances/getPreviousLoadBalance`,
    method: 'POST',
    data,
  });
};

const prepareLoadBalance = (data) => {
  return api({
    url: `LoadBalances/prepareLoadBalance`,
    method: 'POST',
    data,
  });
};

const getDraftedLoadBalances = ({ customerId, pageSize, pageNumber }) => {
  return api({
    url: `LoadBalances/getDraftedLoadBalances?customerId=${customerId}&PageSize=${pageSize}&PageNumber=${pageNumber}`,
    method: 'GET',
  });
};

const loadBalancesSave = (data) => {
  return api({
    url: `LoadBalances`,
    method: 'POST',
    data,
  });
};

const loadBalancesUpdate = (data) => {
  return api({
    url: `LoadBalances`,
    method: 'PUT',
    data,
  });
};

const loadBalancesDelete = ({ id }) => {
  return api({
    url: `LoadBalances?id=${id}`,
    method: 'DELETE',
  });
};

const getById = ({ id }) => {
  return api({
    url: `LoadBalances/getbyid?id=${id}`,
    method: 'GET',
  });
};

const copyLoadBalance = (data) => {
  return api({
    url: `LoadBalances/copyLoadBalance`,
    method: 'POST',
    data,
  });
};

const balanceUploadServices = {
  getCurrentLoadBalance,
  getPreviousLoadBalance,
  getDraftedLoadBalances,
  prepareLoadBalance,
  loadBalancesSave,
  loadBalancesUpdate,
  loadBalancesDelete,
  getById,
  copyLoadBalance,
};

export default balanceUploadServices;
