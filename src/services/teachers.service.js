import { api } from './api';

const getByFilterPagedTeachers = (data) => {
    return api({
        url: `Account/Teachers/GetByFilterPagedTeachers`,
        method: 'POST',
        data,
    });
};

const uploadTeacherExcel = (data) => {
    const headers = { 'Content-Type': 'blob' };
    return api({
        url: `Account/Teachers/uploadTeacherExcel`,
        method: 'POST',
        data,
        responseType: 'arraybuffer',
        headers,
    });
};

const setTeacherActivateStatus = (data) => {
    return api({
        url: `Account/Teachers/SetActivateStatus`,
        method: 'POST',
        data,
    });
};

const getTeacherById = (id) => {
    return api({
        url: `Account/Teachers/getbyid?Id=${id}`,
        method: 'GET',
    });
};

const addTeacher = (data) => {
    return api({
        url: `Account/Teachers/Add`,
        method: 'POST',
        data,
    });
};

const editTeacher = (data) => {
    return api({
        url: `Account/Teachers/Update`,
        method: 'PUT',
        data,
    });
};

const deleteTeacher = (data) => {
    return api({
        url: `Account/Teachers`,
        method: 'DELETE',
        data,
    });
};

const downloadTeacherExcel = (data) => {
    const headers = { 'Content-Type': 'blob' };
    return api({
        url: `Account/Teachers/downloadTeacherExcel`,
        method: 'GET',
        data,
        responseType: 'arraybuffer',
        headers,
    });
};

const teachersServices = {
    getByFilterPagedTeachers,
    uploadTeacherExcel,
    setTeacherActivateStatus,
    addTeacher,
    editTeacher,
    deleteTeacher,
    getTeacherById,
    downloadTeacherExcel,
};

export default teachersServices;
