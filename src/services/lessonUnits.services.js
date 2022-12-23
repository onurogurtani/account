import { api } from './api';

const getUnits = (data = null) => {
  return api({
    url: `LessonUnits/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const addUnits = (data) => {
  return api({
    url: `LessonUnits`,
    method: 'POST',
    data,
  });
};
const editUnits = (data) => {
  return api({
    url: `LessonUnits`,
    method: 'PUT',
    data,
  });
};

const deleteUnits = (id) => {
  return api({
    url: `LessonUnits?id=${id}`,
    method: 'DELETE',
  });
};

const lessonUnitsServices = {
  getUnits,
  addUnits,
  editUnits,
  deleteUnits,
};

export default lessonUnitsServices;
