import { api } from './api';

const addFormCategory = (data) => {
    return api({
        url: `Exam/CategoryOfForms`,
        method: 'POST',
        data,
    });
};

const editFormCategory = (data) => {
    return api({
        url: `Exam/CategoryOfForms`,
        method: 'PUT',
        data,
    });
};

const getFormCategoryList = (data = null) => {
    return api({
        url: `Exam/CategoryOfForms/getList?PageSize=0`,
        method: 'POST',
        data,
    });
};

const categoryOfVideosServices = {
    addFormCategory,
    editFormCategory,
    getFormCategoryList,
};

export default categoryOfVideosServices;
