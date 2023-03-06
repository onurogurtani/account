import { api } from './api';

const GetByFilterPagedGroups = (params) => {
    return api({
        url: `Identity/Groups/GetByFilterPagedGroups`,
        method: 'POST',
        params,
    });
};

const getGroupsList = () => {
    return api({
        url: `Identity/Groups/getall`,
        method: 'GET',
    });
};

const groupsServices = {
    GetByFilterPagedGroups,
    getGroupsList,
};

export default groupsServices;
