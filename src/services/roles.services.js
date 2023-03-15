import { api } from './api';

const getByFilterPagedRoles = (data) => {
    return api({
        url: `Identity/Roles/GetByFilterPagedRoles`,
        method: 'POST',
        data,
    });
};

const addRole = (data) => {
    return api({
        url: `Identity/Roles/Add`,
        method: 'POST',
        data,
    });
};

const updateRole = (data) => {
    return api({
        url: `Identity/Roles/Update`,
        method: 'PUT',
        data,
    });
};

const getRoleById = (params) => {
    return api({
        url: `Identity/Roles/getbyid`,
        method: 'GET',
        params,
    });
};
const roleCopy = (data) => {
    return api({
        url: `Identity/Roles/RoleCopy`,
        method: 'POST',
        data,
    });
};
const getAllRoleList = ({ data = null, params = { PageSize: 0 } }) => {
    return api({
        url: `Identity/Roles/getList`,
        method: 'POST',
        data,
        params,
    });
};

const passiveCheckControlRole = (params) => {
    return api({
        url: `Identity/Roles/PassiveCheckControlRole`,
        method: 'GET',
        params,
    });
};
const setPassiveRole = (data) => {
    return api({
        url: `Identity/Roles/SetPassiveRole`,
        method: 'POST',
        data,
    });
};
const setActiveRole = (data) => {
    return api({
        url: `Identity/Roles/SetActiveRole`,
        method: 'POST',
        data,
    });
};

const getRoleTypes = (data) => {
    return api({
        url: `Identity/Roles/getRoleTypes`,
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
