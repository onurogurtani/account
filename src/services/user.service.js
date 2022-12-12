import { api } from './api';

const getByFilterPagedUsers = (urlString) => {
  return api({
    url: `Users/getByFilterPaged?${urlString}`,
    method: 'POST',
  });
};

const getByUserId = (id) => {
  return api({
    url: `Users/getbyid?id=${id}`,
    method: 'GET',
  });
};

const editUser = (data) => {
  return api({
    url: `Users/edit`,
    method: 'PUT',
    data,
  });
};

const addUser = (data) => {
  return api({
    url: `Users/add`,
    method: 'POST',
    data,
  });
};

const deleteUser = (data) => {
  return api({
    url: `Users/delete`,
    method: 'DELETE',
    data,
  });
};
const setUserStatus = (data) => {
  return api({
    url: `Users/setStatus`,
    method: 'POST',
    data,
  });
};

const userServices = {
  getByFilterPagedUsers,
  editUser,
  addUser,
  deleteUser,
  getByUserId,
  setUserStatus,
};

export default userServices;
