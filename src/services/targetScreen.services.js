import { api } from './api';

const getTargetScreenList = (urlString) => {
  return api({
    url: `Mono/TargetScreens/GetByFilterPagedTargetScreens${urlString}`,
    method: 'POST',
  });
};

const addTargetScreen = (data) => {
  return api({
    url: 'Mono/TargetScreens/Add',
    method: 'POST',
    data,
  });
};

const updateTargetScreen = (data) => {
  return api({
    url: 'Mono/TargetScreens/Update',
    method: 'PUT',
    data,
  });
};
const deleteTargetScreen = (data) => {
  return api({
    url: `Mono/TargetScreens/Delete`,
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
