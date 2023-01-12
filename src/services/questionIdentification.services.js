import { api } from './api';
const getByFilterPagedQuestionOfExams = (data) => {
  return api({
    url: 'QuestionOfExams/GetByFilterPagedQuestionOfExams',
    method: 'POST',
    params: data,
  });
};
const fileUpload = (data) => {
  return api({
    url: 'Files',
    method: 'POST',
    params: data,
  });
};

const publisherServices = {
  getByFilterPagedQuestionOfExams,
  fileUpload,
};

export default publisherServices;
