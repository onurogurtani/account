import { api } from './api';

const cardGetPagedList = ({ data, pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `Cards/getPagedList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data,
  });
};

const processTypesGetPagedList = (data) => {
  return api({
    url: `ProcessTypes/getPagedList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data,
  });
};

const cardsCancelList = (data) => {
  return api({
    url: `Cards/cardCancelList`,
    method: 'POST',
    data,
  });
};

const employeesUpdateList = (data) => {
  return api({
    url: `Employees/updateList`,
    method: 'POST',
    data,
  });
};

const cancelRequestsDelete = (data) => {
  return api({
    url: `CancelRequests/delete`,
    method: 'DELETE',
    data,
  });
};

const manageCardsServices = {
  cardGetPagedList,
  processTypesGetPagedList,
  cardsCancelList,
  employeesUpdateList,
  cancelRequestsDelete,
};

export default manageCardsServices;
