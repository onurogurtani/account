import { api } from './api';

const adAsEv = (data) => {
    return api({
        url: `Exam/AsEvs`,
        method: 'POST',
        data,
    });
};

const getFilterPagedAsEvs = (params) => {
    return api({
        url: `Exam/AsEvs/getByFilterPagedAsEvs`,
        method: 'POST',
        params,
    });
};
const deleteAsEv = (data) => {
    return api({
        url: `Exam/AsEvs?Id=${data}`,
        method: 'DELETE',
    });
};

const getAsEvQuestionOfExamsByAsEvId = (data) => {
    return api({
        url: `Exam/AsEvQuestionOfExams/getAsEvQuestionOfExamsByAsEvId?asEvId=${data}`,
        method: 'POST',
    });
};

const getByFilterPagedAsEvQuestions = (data) => {
    return api({
        url: `Exam/AsEvs/GetByFilterPagedAsEvQuestions`,
        method: 'POST',
        data,
    });
};

const addAsEvQuestion = (data) => {
    return api({
        url: `Exam/AsEvs/AsEvAddQuestion`,
        method: 'POST',
        data,
    });
};

const removeAsEvQuestion = (data) => {
    return api({
        url: `Exam/AsEvs/AsEvRemovalQuestion`,
        method: 'POST',
        data,
    });
};

const getAsEvTestPreview = (data) => {
    return api({
        url: `Exam/AsEvs/GetAsEvTestPreview`,
        method: 'POST',
        data,
    });
};

const setQuestionSequence = (data) => {
    return api({
        url: `Exam/AsEvs/SetQuestionSequence`,
        method: 'POST',
        data,
    });
};

const updateAsEv = (data) => {
    return api({
        url: `Exam/AsEvs`,
        method: 'PUT',
        data,
    });
};

const asEvServices = {
    adAsEv,
    getFilterPagedAsEvs,
    deleteAsEv,
    getAsEvQuestionOfExamsByAsEvId,
    getByFilterPagedAsEvQuestions,
    addAsEvQuestion,
    removeAsEvQuestion,
    getAsEvTestPreview,
    setQuestionSequence,
    updateAsEv
};

export default asEvServices;
