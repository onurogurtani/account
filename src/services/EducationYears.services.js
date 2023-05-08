import { api } from './api';

const getEducationYearList = (data = null, params) => {
    return api({
        url: `Education/EducationYears/getList`,
        method: 'POST',
        data,
        params,
    });
};
const getEducationYearAdd = (data) => {
    return api({
        url: `Education/EducationYears`,
        method: 'POST',
        data: data,
    });
};
const getEducationYearUpdate = (data) => {
    return api({
        url: `Education/EducationYears`,
        method: 'PUT',
        data: data,
    });
};

//kullanılmıyor
const getEducationYearDelete = (data) => {
    return api({
        url: `Education/EducationYears`,
        method: 'DELETE',
        data: data,
    });
};

const getActiveEducationYear = (data = null) => {
    return api({
        url: `Education/EducationYears/getActiveEducationYear`,
        method: 'POST',
        data,
    });
};

const EducationYearsServices = {
    getEducationYearList,
    getEducationYearAdd,
    getEducationYearUpdate,
    getEducationYearDelete,
    getActiveEducationYear
};

export default EducationYearsServices;
