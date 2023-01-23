import { api } from './api';

const GetByFilterPagedGroups = (params) => {
  return api({
    url: `Books/GetByFilterPagedBooks`,
    method: 'POST',
    params
  });
};

const booksServices = {
  GetByFilterPagedGroups,
};

export default booksServices;
