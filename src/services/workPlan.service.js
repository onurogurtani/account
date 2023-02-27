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

const workPlanService = {
  getByFilterPagedQuestionOfExams,
  getAsEvQuestionOfExamsByAsEvId,
  getByFilterPagedWorkPlans
};

export default workPlanService;
