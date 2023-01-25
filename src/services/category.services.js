import { api } from './api';

const getByFilterPagedCategoriesQuery = (data) => {
  return api({
    url: `Mono/Category/GetByFilterPagedCategoriesQuery`,
    method: 'POST',
    data,
  });
};

const categoryServices = {
  getByFilterPagedCategoriesQuery,
};

export default categoryServices;
