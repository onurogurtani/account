import { api } from './api';
const getByFilterPagedQuestionOfExams = (data) => {
  return api({
    url: 'QuestionOfExams/GetByFilterPagedQuestionOfExams',
    method: 'POST',
    params: data,
  });
};

const publisherServices = {
  getByFilterPagedQuestionOfExams,
};

export default publisherServices;
