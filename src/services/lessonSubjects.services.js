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

const setLessonSubjectStatus = (data) => {
    return api({
        url: `/Shared/LessonSubjects/setIsActive`,
        method: 'POST',
        data,
    });
};
const lessonSubjectsServices = {
    getLessonSubjects,
    addLessonSubjects,
    editLessonSubjects,
    setLessonSubjectStatus,
};

export default lessonSubjectsServices;
