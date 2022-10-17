import { api } from './api';

const getLessons = () => {
  return api({
    url: `Lessons/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getUnits = () => {
  return api({
    url: `LessonUnits/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getLessonSubjects = () => {
  return api({
    url: `LessonSubjects/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getLessonSubSubjects = () => {
  return api({
    url: `LessonSubSubjects/getList?PageSize=0`,
    method: 'POST',
    data: null,
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
};

export default lessonsServices;
