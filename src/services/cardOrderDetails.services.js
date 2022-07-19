import { api } from './api';

const cardOrderDetailsGelAll = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `CardOrderDetails/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const cardOrderDetailSave = (data) => {
  return api({
    url: `CardOrderDetails`,
    method: 'POST',
    data,
  });
};

const cardOrderDetailUpdate = (data) => {
  return api({
    url: `CardOrderDetails`,
    method: 'PUT',
    data,
  });
};

const cardOrderDetailDelete = ({ id }) => {
  return api({
    url: `CardOrderDetails?id=${id}`,
    method: 'DELETE',
  });
};

const getCardOrderDetailExcelTemplate = (data) => {
  return api({
    url: `CardOrderDetails/cardorderdetailexceltemplate`,
    method: 'POST',
    responseType: 'arraybuffer',
    data,
  });
};

const setCardOrderDetailExcelUpload = (data) => {
  return api({
    url: `CardOrderDetails/cardorderdetailexcelupload`,
    method: 'POST',
    data,
  });
};

const cardOrderDetailsServices = {
  cardOrderDetailsGelAll,
  cardOrderDetailSave,
  cardOrderDetailUpdate,
  cardOrderDetailDelete,
  getCardOrderDetailExcelTemplate,
  setCardOrderDetailExcelUpload,
};

export default cardOrderDetailsServices;
