import { api } from './api';

const loadSchools = (data) => {
  return api({
    url: `Schools/uploadSchoolExcel`,
    method: 'POST',
    data,
  });
};

const getSchools = () => {
  return api({
    url: `Schools/getList`,
    method: 'POST',
  });
};

const getSchoolById = ({ id }) => {
  return api({
    url: `Schools/getbyid?id=${id}`,
    method: 'GET',
  });
};

const addSchool = (data) => {
  return api({
    url: `Schools`,
    method: 'POST',
    data,
  });
};

const updateSchool = (data) => {
  return api({
    url: `Schools`,
    method: 'PUT',
    data,
  });
};

const deleteSchool = ({ id }) => {
  return api({
    url: `Schools?id=${id}`,
    method: 'DELETE',
  });
};
const getInstitutionTypes = () => {
  return api({
    url: `InstitutionTypes/getList`,
    method: 'POST',
  });
};

const downloadSchoolExcel = () => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: 'Schools/downloadSchoolExcel',
    method: 'GET',
    responseType: 'arraybuffer',
    headers,
  });
};
const schoolsServices = {
  loadSchools,
  getSchools,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
  getInstitutionTypes,
  downloadSchoolExcel,
};

export default schoolsServices;
