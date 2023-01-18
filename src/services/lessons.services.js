import { api } from './api';

const getLessons = (data = null) => {
  return api({
    url: `Lessons/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const addLessons = (data) => {
  return api({
    url: `Lessons`,
    method: 'POST',
    data,
  });
};

const getByClassromIdLessons = (classroomId) => {
  return api({
    url: `Lessons/getByClassromIdLessons?ClassroomId=${classroomId}`,
    method: 'POST',
  });
};

const editLessons = (data) => {
  return api({
    url: `Lessons`,
    method: 'PUT',
    data,
  });
};

const deleteLessons = (id) => {
  return api({
    url: `Lessons?id=${id}`,
    method: 'DELETE',
  });
};

const downloadLessonsExcel = () => {
  return api({
    url: `/Lessons/downloadLessonExcel`,
    method: 'GET',
    responseType: 'blob',
  });
};

const uploadLessonsExcel = (data) => {
  return api({
    url: `/Lessons/uploadLessonExcel`,
    method: 'POST',
    data,
  });
};

const lessonsServices = {
  getLessons,
  editLessons,
  deleteLessons,
  downloadLessonsExcel,
  uploadLessonsExcel,
  addLessons,
  getByClassromIdLessons
};

export default lessonsServices;
