import { api } from './api';

const trialExamsAdd = (data) => {
    return api({
        url: '/Exam/TestExams/Add',
        method: 'POST',
        data: data,
    });
};

const getTrialExamList = (data) => {
    return api({
        url: '/Exam/TestExams/GetByFilterPagedTestExams',
        method: 'POST',
        data: data,
    });
};
const getTrialExamById = (params) => {
    return api({
        url: '/Exam/TestExams/getbyid',
        method: 'get',
        params: params,
    });
};
const trialExamsUpdate = (data) => {
    return api({
        url: '/Exam/TestExams/Update',
        method: 'PUT',
        data: data,
    });
};
const sectionDescriptions = (params) => {
    return api({
        url: '/Exam/SectionDescriptions/getbyExamKind',
        method: 'GET',
        params: params,
    });
};
const fileUpload = (data, options) => {
    return api({
        url: '/File/Files',
        method: 'POST',
        data: data,
        headers: { ...options },
    });
};
const trialExamServices = {
    trialExamsAdd,
    getTrialExamList,
    trialExamsUpdate,
    sectionDescriptions,
    fileUpload,
    getTrialExamById,
};

export default trialExamServices;
