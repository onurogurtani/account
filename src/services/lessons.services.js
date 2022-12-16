import { api } from './api';

const getLessonDetailSearch = (id) => {
  return api({
    url: `Lessons/getByFilterPagedLessons?LessonDetailSearch.ClassroomId=${id}`,
    method: 'POST',
  });
};

const getLessons = (data = null) => {
  return api({
    url: `Lessons/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const getUnits = (data = null) => {
  return api({
    url: `LessonUnits/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const getLessonSubjects = (data = null) => {
  return api({
    url: `LessonSubjects/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const getLessonSubSubjects = (data = null) => {
  return api({
    url: `LessonSubSubjects/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const downloadLessonsExcel = () => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: `/Lessons/downloadLessonExcel`,
    method: 'GET',
    responseType: 'arraybuffer',
    headers,
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
  getUnits,
  getLessonSubjects,
  getLessonSubSubjects,
  downloadLessonsExcel,
  uploadLessonsExcel,
  getLessonDetailSearch,
};

export default lessonsServices;
