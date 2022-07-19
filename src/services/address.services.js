import { api } from './api';

const addressSave = (data) => {
  return api({
    url: `Addresses/add`,
    method: 'POST',
    data,
  });
};

const addressGetList = (customerId) => {
  return api({
    url: `Addresses/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: {
      customerId: customerId,
    },
  });
};

const addressServices = {
  addressSave,
  addressGetList,
};

export default addressServices;
