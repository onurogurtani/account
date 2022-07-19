import { api } from './api';

const loadBalanceDetailsGetPagedList = (data, pageNumber, pageSize) => {
  return api({
    url: `LoadBalanceDetails/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const updateLoadBalanceDetailPrice = (data) => {
  return api({
    url: `LoadBalanceDetails/updateLoadBalanceDetailPrice`,
    method: 'POST',
    data,
  });
};

const loadBalanceDetailUpdate = (data) => {
  return api({
    url: `LoadBalanceDetails`,
    method: 'PUT',
    data,
  });
};

const loadBalanceDetailExcelTemplate = (data) => {
  return api({
    url: `LoadBalanceDetails/loadBalanceDetailExcelTemplate`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

const loadBalanceDetailExcelUpload = (data) => {
  return api({
    url: `LoadBalanceDetails/loadBalanceDetailExcelUpload`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

const balanceUploadDetailServices = {
  loadBalanceDetailUpdate,
  loadBalanceDetailsGetPagedList,
  updateLoadBalanceDetailPrice,
  loadBalanceDetailExcelUpload,
  loadBalanceDetailExcelTemplate,
};

export default balanceUploadDetailServices;
