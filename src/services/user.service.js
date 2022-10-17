import { api } from './api';

const userGetList = ({ pageNumber = 1, pageSize = 10 }) => {
  return api({
    url: `Users/getList?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    method: 'POST',
    data: null,
  });
};

const userUpdate = (data) => {
  return api({
    url: `Users`,
    method: 'PUT',
    data,
  });
};

const addUser = (data) => {
  return api({
    url: `Users`,
    method: 'POST',
    data,
  });
};

const deleteUser = ({ id }) => {
  return api({
    url: `Users?id=${id}`,
    method: 'DELETE',
  });
};

const userServices = {
  userGetList,
  userUpdate,
  addUser,
  deleteUser,
};

export default userServices;
