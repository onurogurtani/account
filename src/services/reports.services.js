import { api } from './api';

const getCardOrderReport = ({ orderId }) => {
  return api({
    url: `Report/cardOrderReport?orderId=${orderId}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const getBalanceOrderReport = ({ orderId }) => {
  return api({
    url: `Report/loadBalanceReport?orderId=${orderId}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const getOrderReport = (data) => {
  return api({
    url: `Report/orderReport`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

const getOrderSummaryPdfReport = (data) => {
  return api({
    url: `Report/orderSummaryReport`,
    method: 'POST',
    data,
    responseType: 'arraybuffer',
  });
};

const getAutoLoadingReport = ({ customerId, vouId, id }) => {
  return api({
    url: `Report/autoLoadingReport?customerId=${customerId}&vouId=${vouId}&id=${id}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const reports = {
  getCardOrderReport,
  getBalanceOrderReport,
  getOrderReport,
  getOrderSummaryPdfReport,
  getAutoLoadingReport,
};

export default reports;
