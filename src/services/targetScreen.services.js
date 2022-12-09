import { api } from './api';

const getTargetScreenList = (urlString) => {
  return api({
    url: `TargetScreens/GetByFilterPagedTargetScreens${urlString}`,
    method: 'POST',
  });
};

const addTargetScreen = (data) => {
  return api({
    url: 'TargetScreens/Add',
    method: 'POST',
    data,
  });
};

const updateTargetScreen = (data) => {
  return api({
    url: 'TargetScreens/Update',
    method: 'PUT',
    data,
  });
};
const deleteTargetScreen = (data) => {
  return api({
    url: `TargetScreens/Delete`,
    method: 'DELETE',
    data,
  });
};

const targetScreenServices = {
  getTargetScreenList,
  addTargetScreen,
  updateTargetScreen,
  deleteTargetScreen,
};

export default targetScreenServices;
