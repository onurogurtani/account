import { api } from './api';

const orderGetPageList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `Orders/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const orderDetailsGetPageList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `OrderDetails/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const packagesGetPagedList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `Packages/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const packagesUpdate = (data) => {
  return api({
    url: `Packages/update`,
    method: 'PUT',
    data,
  });
};

const orderInfosGetList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `OrderInfos/getList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const orderDelete = (data) => {
  return api({
    url: `Orders/delete`,
    method: 'DELETE',
    data,
  });
};

const paymentLinksAdd = (data) => {
  return api({
    url: `PaymentLinks/add`,
    method: 'POST',
    data,
  });
};

const getMailList = (id) => {
  return api({
    url: `Users/getUserMailList?customerId=${id}`,
    method: 'POST',
  });
};

const downloadOrderFile = (data) => {
  return api({
    url: `Orders/downloadOrderFile`,
    method: 'POST',
    data,
    responseType: 'blob',
  });
};

const orderServices = {
  orderGetPageList,
  orderDetailsGetPageList,
  packagesGetPagedList,
  packagesUpdate,
  orderInfosGetList,
  orderDelete,
  paymentLinksAdd,
  getMailList,
  downloadOrderFile,
};

export default orderServices;
