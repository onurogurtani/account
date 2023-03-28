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
const trialExamServices = {
    trialExamsAdd,
    getTrialExamList,
};

export default trialExamServices;
