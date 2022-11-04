import { api } from './api';

const getByFilterPagedCategoriesQuery = (data) => {
  return api({
    url: `Category/getByFilterPagedCategoriesQuery`,
    method: 'POST',
    data,
  });
};



const categoryServices = {
  getByFilterPagedCategoriesQuery,
};

export default categoryServices;
