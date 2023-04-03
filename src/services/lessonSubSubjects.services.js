import { api } from './api';

const getLessonSubSubjects = (data = null) => {
    return api({
        url: `Education/LessonSubSubjects/getList?PageSize=0`,
        method: 'POST',
        data,
    });
};

const addLessonSubSubjects = (data) => {
    return api({
        url: `Education/LessonSubSubjects`,
        method: 'POST',
        data,
    });
};

const editLessonSubSubjects = (data) => {
    return api({
        url: `Education/LessonSubSubjects`,
        method: 'PUT',
        data,
    });
};

const lessonSubSubjectsServices = {
    getLessonSubSubjects,
    addLessonSubSubjects,
    editLessonSubSubjects,
};

export default lessonSubSubjectsServices;
