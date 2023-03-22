import { api } from "./api";

const getByFilterPagedTeachers = (data) => {
  return api({
    url: `Identity/Teachers/GetByFilterPagedTeachers`,
    method: 'POST',
    data,
  });
};

const uploadTeacherExcel = (data) => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: `Identity/Teachers/uploadTeacherExcel`,
    method: 'POST',
    data,
    responseType: 'arraybuffer',
    headers,
  });
};

const getTeacherById = (id) => {
  return api({
    url: `Identity/Teachers/getbyid?Id=${id}`,
    method: 'GET',
  });
};

const addTeacher = (data) => {
  return api({
    url: `Identity/Teachers/Add`,
    method: 'POST',
    data,
  });
};

const updateTeacher = (data) => {
  return api({
    url: `Identity/Teachers/Update`,
    method: 'PUT',
    data,
  });
};

const downloadTeacherExcel = (data) => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: `Identity/Teachers/downloadTeacherExcel`,
    method: 'GET',
    data,
    responseType: 'arraybuffer',
    headers,
  });
};

const teachersServices = {
  getByFilterPagedTeachers,
  uploadTeacherExcel,
  addTeacher,
  updateTeacher,
  getTeacherById,
  downloadTeacherExcel,
};

export default teachersServices;
