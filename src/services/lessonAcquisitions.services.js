import { api } from './api';

const getLessonAcquisitions = (data = null, params = { PageSize: 0 }) => {
    return api({
        url: `Education/LessonAcquisitions/getList`,
        method: 'POST',
        data,
        params,
    });
};

const addLessonAcquisitions = (data) => {
    return api({
        url: `Education/LessonAcquisitions`,
        method: 'POST',
        data,
    });
};

const editLessonAcquisitions = (data) => {
    return api({
        url: `Education/LessonAcquisitions`,
        method: 'PUT',
        data,
    });
};

const setLessonAcquisitionStatus = (data) => {
    return api({
        url: `Education/LessonAcquisitions/setIsActive`,
        method: 'POST',
        data,
    });
};

const lessonAcquisitionsServices = {
    getLessonAcquisitions,
    addLessonAcquisitions,
    editLessonAcquisitions,
    setLessonAcquisitionStatus,
};

export default lessonAcquisitionsServices;
