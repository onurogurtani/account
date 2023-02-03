import { api } from './api';

//kullanılmıyor
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
