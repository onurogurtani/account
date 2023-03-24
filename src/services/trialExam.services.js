import { api } from './api';

const trialExamsAdd = (data) => {
    return api({
        url: '/Exam/TestExams/Add',
        method: 'POST',
        data: data,
    });
};

const trialExamServices = {
    trialExamsAdd,
};

export default trialExamServices;
