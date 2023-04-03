import { api } from './api';

const getUnits = (data = null) => {
    return api({
        url: `Education/LessonUnits/getList?PageSize=0`,
        method: 'POST',
        data,
    });
};

const addUnits = (data) => {
    return api({
        url: `Education/LessonUnits`,
        method: 'POST',
        data,
    });
};
const editUnits = (data) => {
    return api({
        url: `Education/LessonUnits`,
        method: 'PUT',
        data,
    });
};
const setUnitStatus = (data) => {
    return api({
        url: `/Education/LessonUnits/setIsActive`,
        method: 'POST',
        data,
    });
};

const lessonUnitsServices = {
    getUnits,
    addUnits,
    editUnits,
    setUnitStatus,
};

export default lessonUnitsServices;
