import { api } from './api';

const getLessonBrackets = (data = null, params = { PageSize: 0 }) => {
    return api({
        url: `Shared/LessonBrackets/getList`,
        method: 'POST',
        data,
        params,
    });
};

const addLessonBrackets = (data) => {
    return api({
        url: `Shared/LessonBrackets`,
        method: 'POST',
        data,
    });
};

const editLessonBrackets = (data) => {
    return api({
        url: `Shared/LessonBrackets`,
        method: 'PUT',
        data,
    });
};

const setLessonBracketStatus = (data) => {
    return api({
        url: `/Shared/LessonBrackets/setIsActive`,
        method: 'POST',
        data,
    });
};

const lessonBracketsServices = {
    getLessonBrackets,
    addLessonBrackets,
    editLessonBrackets,
    setLessonBracketStatus,
};

export default lessonBracketsServices;
