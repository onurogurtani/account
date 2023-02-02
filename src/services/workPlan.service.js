import { api } from './api';


const getByFilterPagedQuestionOfExams = (params) => {
  return api({
    url: `Mono/QuestionOfExams/GetByFilterPagedQuestionOfExams`,
    method: 'POST',
    params,
  });
};

const workPlanService = {
  getByFilterPagedQuestionOfExams
};

export default workPlanService;
