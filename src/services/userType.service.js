import { api } from './api';

const getUserTypesList = () => {
    return api({
        url: `Account/UserTypes/getList`,
        method: 'GET',
    });
};

const userTypeServices = {
    getUserTypesList,
};

export default userTypeServices;
