import { api } from './api';

const loadSchools = (data) => {
  return api({
    url: `Member/Schools/uploadSchoolExcel`,
    method: 'POST',
    data,
  });
};

const getSchools = (data) => {
  return api({
    url: `Member/Schools/getPagedList?PageNumber=${data.pageNumber || 0}&PageSize=${data.pageSize || 0}`,
    method: 'POST',
    data,
  });
};

const getSchoolById = ({ id }) => {
  return api({
    url: `Member/Schools/getbyid?id=${id}`,
    method: 'GET',
  });
};

const addSchool = (data) => {
  return api({
    url: `Member/Schools`,
    method: 'POST',
    data,
  });
};

const updateSchool = (data) => {
  return api({
    url: `Member/Schools`,
    method: 'PUT',
    data,
  });
};

const deleteSchool = ({ id }) => {
  return api({
    url: `Member/Schools?id=${id}`,
    method: 'DELETE',
  });
};
const getInstitutionTypes = (data = null) => {
  return api({
    url: `Member/InstitutionTypes/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const downloadSchoolExcel = () => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: 'Member/Schools/downloadSchoolExcel',
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