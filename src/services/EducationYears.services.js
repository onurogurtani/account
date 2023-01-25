import { api } from './api';

const getEducationYearList = (data = null, params) => {
  return api({
    url: `Mono/EducationYears/getList`,
    method: 'POST',
    data,
    params,
  });
};
const getEducationYearAdd = (data) => {
  return api({
    url: `Mono/EducationYears`,
    method: 'POST',
    data: data,
  });
};
const getEducationYearUpdate = (data) => {
  return api({
    url: `Mono/EducationYears`,
    method: 'PUT',
    data: data,
  });
};

//kullanılmıyor
const getEducationYearDelete = (data) => {
  return api({
    url: `Mono/EducationYears`,
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
