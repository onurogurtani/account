import { api } from './api';

const getByFilterPagedSubCategories = (data) => {
  return api({
    url: `SubCategory/getByFilterPagedSubCategories?SubCategoryDetailSearch.CategoryId=${data?.id}`,
    method: 'POST',
    data,
  });
};

const addSubCategory = (data) => {
  return api({
    url: `SubCategory/Add`,
    method: 'POST',
    data,
  });
};

const updateSubCategory = (data) => {
  return api({
    url: `SubCategory/Update`,
    method: 'PUT',
    data,
  });
};


const categoryServices = {
  getByFilterPagedSubCategories,
  addSubCategory,
  updateSubCategory
};

export default categoryServices;
