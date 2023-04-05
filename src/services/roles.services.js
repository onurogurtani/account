import { api } from './api';

const getByFilterPagedRoles = (data) => {
    return api({
        url: `Account/Roles/GetByFilterPagedRoles`,
        method: 'POST',
        data,
    });
};

const addRole = (data) => {
    return api({
        url: `Account/Roles/Add`,
        method: 'POST',
        data,
    });
};

const updateRole = (data) => {
    return api({
        url: `Account/Roles/Update`,
        method: 'PUT',
        data,
    });
};

const getRoleById = (params) => {
    return api({
        url: `Account/Roles/getbyid`,
        method: 'GET',
        params,
    });
};
const roleCopy = (data) => {
    return api({
        url: `Account/Roles/RoleCopy`,
        method: 'POST',
        data,
    });
};
const getAllRoleList = ({ data = null, params = { PageSize: 0 } }) => {
    return api({
        url: `Account/Roles/getList`,
        method: 'POST',
        data,
        params,
    });
};

const passiveCheckControlRole = (params) => {
    return api({
        url: `Account/Roles/PassiveCheckControlRole`,
        method: 'GET',
        params,
    });
};
const setPassiveRole = (data) => {
    return api({
        url: `Account/Roles/SetPassiveRole`,
        method: 'POST',
        data,
    });
};
const setActiveRole = (data) => {
    return api({
        url: `Account/Roles/SetActiveRole`,
        method: 'POST',
        data,
    });
};

const getRoleTypes = (data) => {
    return api({
        url: `Account/Roles/getRoleTypes`,
        method: 'Get',
        data,
    });
};

const rolesServices = {
    getByFilterPagedRoles,
    addRole,
    updateRole,
    getRoleById,
    roleCopy,
    getAllRoleList,
    passiveCheckControlRole,
    setPassiveRole,
    setActiveRole,
    getRoleTypes,
};

export default rolesServices;
