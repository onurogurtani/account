import { api } from './api';

const getCurrentCardOrder = ({ customerId }) => {
  return api({
    url: `CardOrders/getCurrentCardOrder?customerId=${customerId}`,
    method: 'GET',
  });
};

const getCardOrders = ({ id }) => {
  return api({
    url: `CardOrders/getbyid?id=${id}`,
    method: 'GET',
  });
};

const cardOrdersSave = (data) => {
  return api({
    url: `CardOrders`,
    method: 'POST',
    data,
  });
};

const cardOrdersUpdate = (data) => {
  return api({
    url: `CardOrders`,
    method: 'PUT',
    data,
  });
};

const cardOrdersDelete = ({ id }) => {
  return api({
    url: `CardOrders?id=${id}`,
    method: 'DELETE',
  });
};

const deleteUnCompleted = () => {
  return api({
    url: `CardOrders/deleteUnCompleted`,
    method: 'DELETE',
  });
};

const getDraftedCardOrders = ({ customerId, pageSize, pageNumber }) => {
  return api({
    url: `CardOrders/getDraftedCardOrders?customerId=${customerId}&PageSize=${pageSize}&PageNumber=${pageNumber}`,
    method: 'GET',
  });
};

const cardOrderServices = {
  getCurrentCardOrder,
  getCardOrders,
  cardOrdersSave,
  cardOrdersUpdate,
  cardOrdersDelete,
  getDraftedCardOrders,
  deleteUnCompleted,
};

export default cardOrderServices;
