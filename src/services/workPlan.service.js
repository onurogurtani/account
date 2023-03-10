import { api } from './api';

const getByFilterPagedQuestionOfExams = (params) => {
  return api({
    url: `Question/QuestionOfExams/GetByFilterPagedQuestionOfExams`,
    method: 'POST',
    params,
  });
};

const getAsEvQuestionOfExamsByAsEvId = (data) => {
  return api({
    url: `/Exam/AsEvQuestionOfExams/getAsEvQuestionOfExamsByAsEvId?asEvId=${data.id}&includeQuestionFilesBase64=${data.includeQuestionFilesBase64}&PageSize=${data.pageSize}`,
    method: 'POST',
  });
};

const getByFilterPagedWorkPlans = (data) => {
  return api({
    url: `Target/WorkPlans/getByFilterPagedWorkPlans`,
    method: 'POST',
    data: data,
  });
};

const addWorkPlan = (data) => {
  return api({
    url: `Target/WorkPlans`,
    method: 'POST',
    data: data,
  });
};

const getUsedVideoIdsQuery = () => {
  return api({
    url: `Target/WorkPlans/getUsedVideoIdsQuery`,
    method: 'GET',
  });
};

const getWorkPlanNamesQuery = () => {
  return api({
    url: `Target/WorkPlans/getWorkPlanNamesQuery`,
    method: 'GET',
  });
};

const deleteWorkPlan = (data) => {
  return api({
    url: `Target/WorkPlans?id=${data.id}`,
    method: 'DELETE',
  });
};

const workPlanService = {
  getByFilterPagedQuestionOfExams,
  getAsEvQuestionOfExamsByAsEvId,
  getByFilterPagedWorkPlans,
  addWorkPlan,
  getUsedVideoIdsQuery,
  getWorkPlanNamesQuery,
  deleteWorkPlan
};

export default workPlanService;
