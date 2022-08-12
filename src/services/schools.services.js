import { api } from './api';

const loadSchools = (data) => {
    return api({
        url: `Schools/uploadSchoolExcel`,
        method: 'POST',
        data,
    });
}

const getSchools = () => {
    return api({
        url: `Schools/getList`,
        method: 'POST',
    });
}

const getSchoolById = ({ id }) => {
    return api({
        url: `Schools/getbyid?id=${id}`,
        method: 'GET',
    });
}

const addSchool = (data) => {
    return api({
        url: `Schools`,
        method: 'POST',
        data,
    });
}

const updateSchool = (data) => {
    return api({
        url: `Schools`,
        method: 'PUT',
        data,
    });
}

const deleteSchool = ({id}) => {
    return api({
        url: `Schools?id=${id}`,
        method: 'DELETE',
    });
}


const schoolsServices = {
    loadSchools,
    getSchools,
    getSchoolById,
    addSchool,
    updateSchool,
    deleteSchool
};

export default schoolsServices;



