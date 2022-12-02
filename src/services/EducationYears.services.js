import { api } from './api';

const getEducationYearList = (data, params) => {
  return api({
    url: `EducationYears/getList`,
    method: 'POST',
    data: null,
    params,
  });
};
const getEducationYearAdd = (data) => {
  return api({
    url: `EducationYears`,
    method: 'POST',
    data: data,
  });
};
const getEducationYearUpdate = (data) => {
  return api({
    url: `EducationYears`,
    method: 'PUT',
    data: data,
  });
};
const getEducationYearDelete = (data) => {
  return api({
    url: `EducationYears`,
    method: 'DELETE',
    data: data,
  });
};

const EducationYearsServices = {
  getEducationYearList,
  getEducationYearAdd,
  getEducationYearUpdate,
  getEducationYearDelete,
};

export default EducationYearsServices;
