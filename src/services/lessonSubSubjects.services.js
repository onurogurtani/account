import { api } from './api';

const getLessonSubSubjects = (data = null) => {
  return api({
    url: `Shared/LessonSubSubjects/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const addLessonSubSubjects = (data) => {
  return api({
    url: `Shared/LessonSubSubjects`,
    method: 'POST',
    data,
  });
};

const editLessonSubSubjects = (data) => {
  return api({
    url: `Shared/LessonSubSubjects`,
    method: 'PUT',
    data,
  });
};

const deleteLessonSubSubjects = (id) => {
  return api({
    url: `Shared/LessonSubSubjects?id=${id}`,
    method: 'DELETE',
  });
};

const lessonSubSubjectsServices = {
  getLessonSubSubjects,
  addLessonSubSubjects,
  editLessonSubSubjects,
  deleteLessonSubSubjects,
};

export default lessonSubSubjectsServices;
