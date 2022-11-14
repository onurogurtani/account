import { api } from './api';

const getClassList = (data) => {
  return api({
    url: 'Classrooms/getList?PageNumber=1&PageSize=1000',
    method: 'POST',
    data:[]
  });
};

const addClass = (data) => {
  return api({
    url: 'Classrooms',
    method: 'POST',
    data,
  });
};

const updateClass = (data) => {
  return api({
    url: 'Classrooms',
    method: 'PUT',
    data,
  });
};
const deleteClass = (data) => {
    return api({
      url: `Classrooms?id=${data}`,
      method: 'DELETE',
    });
  };

const classStageServices = {
    getClassList ,
    addClass,
    updateClass,
    deleteClass,
};

export default classStageServices;
