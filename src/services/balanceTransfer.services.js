import { api } from './api';

const getCardBalanceList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `Cards/getCardBalanceList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const addBalanceTransfers = (data) => {
  return api({
    url: `BalanceTransfers/add`,
    method: 'POST',
    data,
  });
};

const balanceTransferServices = {
  getCardBalanceList,
  addBalanceTransfers,
};

export default balanceTransferServices;
