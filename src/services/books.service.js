import { api } from './api';

const GetByFilterPagedGroups = (params) => {
  return api({
    url: `Mono/Books/getByFilterPagedBooks`,
    method: 'POST',
    params,
  });
};

const booksServices = {
  GetByFilterPagedGroups,
};

export default booksServices;
