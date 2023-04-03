import { api } from './api';

const getLessons = (data = null) => {
    return api({
        url: `Education/Lessons/getList?PageSize=0`,
        method: 'POST',
        data,
    });
};

const addLessons = (data) => {
    return api({
        url: `Education/Lessons`,
        method: 'POST',
        data,
    });
};

const getByClassromIdLessons = (classroomId) => {
    return api({
        url: `Education/Lessons/getByClassromIdLessons?ClassroomId=${classroomId}`,
        method: 'POST',
    });
};

const getByClassromIdLessonsBySearchText = (data) => {
    return api({
        url: `Education/Lessons/getByClassromIdLessons?ClassroomId=${data.classroomId}&searchText=${data.searchText}`,
        method: 'POST',
    });
};

const editLessons = (data) => {
    return api({
        url: `Education/Lessons`,
        method: 'PUT',
        data,
    });
};

const downloadLessonsExcel = () => {
    return api({
        url: `/Education/Lessons/downloadLessonExcel`,
        method: 'GET',
        responseType: 'blob',
    });
};

const uploadLessonsExcel = (data) => {
    return api({
        url: `/Education/Lessons/uploadLessonExcel`,
        method: 'POST',
        data,
    });
};
const setLessonStatus = (data) => {
    return api({
        url: `/Education/Lessons/setIsActive`,
        method: 'POST',
        data,
    });
};

const lessonsServices = {
    getLessons,
    editLessons,
    downloadLessonsExcel,
    uploadLessonsExcel,
    addLessons,
    getByClassromIdLessons,
    getByClassromIdLessonsBySearchText,
    setLessonStatus,
};

export default lessonsServices;
