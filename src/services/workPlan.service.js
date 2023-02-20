import { api } from './api';

const getByFilterPagedQuestionOfExams = (params) => {
  return api({
    url: `Question/QuestionOfExams/GetByFilterPagedQuestionOfExams`,
    method: 'POST',
    params,
  });
};

const workPlanService = {
  getByFilterPagedQuestionOfExams,
};

export default workPlanService;
