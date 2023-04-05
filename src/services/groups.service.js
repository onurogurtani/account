import { api } from './api';

const GetByFilterPagedGroups = (params) => {
    return api({
        url: `Account/Groups/GetByFilterPagedGroups`,
        method: 'POST',
        params,
    });
};

const getGroupsList = () => {
    return api({
        url: `Account/Groups/getall`,
        method: 'GET',
    });
};

const groupsServices = {
    GetByFilterPagedGroups,
    getGroupsList,
};

export default groupsServices;
