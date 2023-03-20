import { api } from "./api";

const getByFilterPagedTeachers = (data) => {
  return api({
    url: `Identity/Teachers/GetByFilterPagedTeachers`,
    method: 'POST',
    data,
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

const teachersServices = {
  getByFilterPagedTeachers,
  addTeacher,
  updateTeacher,
  getTeacherById,
};

export default teachersServices;
