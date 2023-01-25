import { api } from './api';

const addFormCategory = (data) => {
  return api({
    url: `Survey/CategoryOfForms`,
    method: 'POST',
    data,
  });
};

const editFormCategory = (data) => {
  return api({
    url: `Survey/CategoryOfForms`,
    method: 'PUT',
    data,
  });
};

const getFormCategoryList = (data = null) => {
  return api({
    url: `Survey/CategoryOfForms/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const categoryOfVideosServices = {
  addFormCategory,
  editFormCategory,
  getFormCategoryList,
};

export default categoryOfVideosServices;
