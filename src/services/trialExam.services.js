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
const trialExamsUpdate = (data) => {
    return api({
        url: '/Exam/TestExams/Update',
        method: 'PUT',
        data: data,
    });
};
const trialExamServices = {
    trialExamsAdd,
    getTrialExamList,
    trialExamsUpdate,
};

export default trialExamServices;
