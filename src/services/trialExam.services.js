import { api } from './api';

const getCurrentUser = () => {
  return api({
    url: 'Users/getCurrentUser',
    method: 'GET',
  });
};

const trialExamServices = {
  getCurrentUser,
};

export default trialExamServices;
