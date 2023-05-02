import { api } from './api';

const getClassList = (data = null) => {
    return api({
        url: 'Education/Classrooms/getList?PageSize=0',
        method: 'POST',
        data,
    });
};





const addClass = (data) => {
    return api({
        url: 'Education/Classrooms',
        method: 'POST',
        data,
    });
};

const updateClass = (data) => {
    return api({
        url: 'Education/Classrooms',
        method: 'PUT',
        data,
    });
};
const deleteClass = (data) => {
    return api({
        url: `Education/Classrooms?id=${data}`,
        method: 'DELETE',
    });
};

const getByIdClass = (data) => {
    return api({
        url: `Education/Classrooms/getbyid?id=${data.id}`,
        method: 'GET',
    });
};




const classStageServices = {
    getClassList,
    addClass,
    updateClass,
    deleteClass,
    getByIdClass,
   
};

export default classStageServices;
