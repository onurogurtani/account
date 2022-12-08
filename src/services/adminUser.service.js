import { api } from './api';

const getByFilterPagedAdminUsers = (urlString) => {
  return api({
    url: `Admins/GetByFilterPagedAdmins?${urlString}`,
    method: 'POST',
  });
};

const getByAdminUserId = (id) => {
  return api({
    url: `Admins/getbyid?Id=${id}`,
    method: 'GET',
  });
};

const addAdminUser = (data) => {
  return api({
    url: `Admins/Add`,
    method: 'POST',
    data,
  });
};

const editAdminUser = (data) => {
  return api({
    url: `Admins/Update`,
    method: 'PUT',
    data,
  });
};

const deleteAdminUser = (data) => {
  return api({
    url: `Admins/Delete`,
    method: 'DELETE',
    data,
  });
};

const setAdminUserStatus = (data) => {
  return api({
    url: `Admins/setStatus`,
    method: 'POST',
    data,
  });
};

const adminUsersServices = {
  getByFilterPagedAdminUsers,
  addAdminUser,
  getByAdminUserId,
  deleteAdminUser,
  editAdminUser,
  setAdminUserStatus,
};

export default adminUsersServices;
