import { api } from './api';

const getLessonSubjects = (data = null) => {
  return api({
    url: `Shared/LessonSubjects/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const addLessonSubjects = (data) => {
  return api({
    url: `Shared/LessonSubjects`,
    method: 'POST',
    data,
  });
};

const editLessonSubjects = (data) => {
  return api({
    url: `Shared/LessonSubjects`,
    method: 'PUT',
    data,
  });
};

const deleteLessonSubjects = (id) => {
  return api({
    url: `Shared/LessonSubjects?id=${id}`,
    method: 'DELETE',
  });
};
const lessonSubjectsServices = {
  getLessonSubjects,
  addLessonSubjects,
  deleteLessonSubjects,
  editLessonSubjects,
};

export default lessonSubjectsServices;
