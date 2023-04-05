import { api } from './api';

const getByFilterPagedAdminUsers = (urlString) => {
    return api({
        url: `Account/Admins/GetByFilterPagedAdmins?${urlString}`,
        method: 'POST',
    });
};

const getByAdminUserId = (id) => {
    return api({
        url: `Account/Admins/getbyid?Id=${id}`,
        method: 'GET',
    });
};

const addAdminUser = (data) => {
    return api({
        url: `Account/Admins/Add`,
        method: 'POST',
        data,
    });
};

const editAdminUser = (data) => {
    return api({
        url: `Account/Admins/Update`,
        method: 'PUT',
        data,
    });
};

const deleteAdminUser = (data) => {
    return api({
        url: `Account/Admins/Delete`,
        method: 'DELETE',
        data,
    });
};

const setAdminUserStatus = (data) => {
    return api({
        url: `Account/Admins/setStatus`,
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
