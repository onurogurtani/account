import { api } from './api';

const getCurrentUser = () => {
  return api({
    url: 'Identity/Users/getCurrentUser',
    method: 'GET',
  });
};

const currentUserUpdate = (data) => {
  return api({
    url: 'Identity/Users',
    method: 'PUT',
    data,
  });
};

const profileServices = {
  getCurrentUser,
  currentUserUpdate,
};

export default profileServices;
