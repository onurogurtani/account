import { api } from './api';

const getCurrentUser = () => {
    return api({
        url: 'Account/Users/getCurrentUser',
        method: 'GET',
    });
};

const currentUserUpdate = (data) => {
    return api({
        url: 'Account/Users',
        method: 'PUT',
        data,
    });
};

const profileServices = {
    getCurrentUser,
    currentUserUpdate,
};

export default profileServices;
