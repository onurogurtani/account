import { api } from './api';

const userCustomersGetList = (data) => {
  return api({
    url: `UserCustomers/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data,
  });
};

const customerLogosGetList = (data) => {
  return api({
    url: `CustomerLogos/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data,
  });
};

const customersServices = {
  userCustomersGetList,
  customerLogosGetList,
};

export default customersServices;
