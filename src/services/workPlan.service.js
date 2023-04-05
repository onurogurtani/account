import { api } from './api';

const getByFilterPagedQuestionOfExams = (params) => {
    return api({
        url: `Exam/QuestionOfExams/GetByFilterPagedQuestionOfExams`,
        method: 'POST',
        params,
    });
};

const getAsEvQuestionOfExamsByAsEvId = (data) => {
    return api({
        url: `Exam/AsEvQuestionOfExams/getAsEvQuestionOfExamsByAsEvId?asEvId=${data.id}&includeQuestionFilesBase64=${data.includeQuestionFilesBase64}&PageSize=${data.pageSize}`,
        method: 'POST',
    });
};

const getByFilterPagedWorkPlans = (data) => {
    return api({
        url: `Education/WorkPlans/getByFilterPagedWorkPlans`,
        method: 'POST',
        data: data,
    });
};

const addWorkPlan = (data) => {
    return api({
        url: `Education/WorkPlans`,
        method: 'POST',
        data: data,
    });
};

const updatedWorkPlan = (data) => {
    return api({
        url: `Education/WorkPlans`,
        method: 'PUT',
        data: data,
    });
};

const getUsedVideoIdsQuery = () => {
    return api({
        url: `Education/WorkPlans/getUsedVideoIdsQuery`,
        method: 'GET',
    });
};

const getWorkPlanNamesQuery = () => {
    return api({
        url: `Education/WorkPlans/getWorkPlanNamesQuery`,
        method: 'GET',
    });
};

const deleteWorkPlan = (data) => {
    return api({
        url: `Education/WorkPlans?id=${data.id}`,
        method: 'DELETE',
    });
};

const getActiveEducationYear = (data = null) => {
    return api({
        url: `Education/EducationYears/getActiveEducationYear`,
        method: 'POST',
        data,
    });
};

const workPlanService = {
    getByFilterPagedQuestionOfExams,
    getAsEvQuestionOfExamsByAsEvId,
    getByFilterPagedWorkPlans,
    addWorkPlan,
    updatedWorkPlan,
    getUsedVideoIdsQuery,
    getWorkPlanNamesQuery,
    deleteWorkPlan,
    getActiveEducationYear,
};

export default workPlanService;
