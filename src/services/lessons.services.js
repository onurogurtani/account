import { api } from './api';

const getLessons = () => {
  return api({
    url: `Lessons/getList`,
    method: 'POST',
  });
};

const getUnits = () => {
  return api({
    url: `LessonUnits/getList`,
    method: 'POST',
  });
};

const getLessonSubjects = () => {
  return api({
    url: `LessonSubjects/getList`,
    method: 'POST',
  });
};

const getLessonSubSubjects = () => {
  return api({
    url: `LessonSubSubjects/getList`,
    method: 'POST',
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
