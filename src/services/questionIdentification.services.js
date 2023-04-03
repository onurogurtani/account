import axios from 'axios';
import { api } from './api';
const getByFilterPagedQuestionOfExams = (data) => {
  return api({
    url: 'Question/QuestionOfExams/GetByFilterPagedQuestionOfExams',
    method: 'POST',
    params: data,
  });
};
const getAddQuestionOfExams = (data) => {
  return api({
    url: 'Question/QuestionOfExamDetails/Add',
    method: 'POST',
    data: data,
  });
};
const getUpdateQuestionOfExams = (data) => {
  return api({
    url: 'Question/QuestionOfExamDetails/Update',
    method: 'PUT',
    data: data,
  });
};
const fileUpload = (data, options) => {
  return axios.post(`${process.env.PUBLIC_HOST_API}/Shared/Files`, data, { ...options });
};

const publisherServices = {
  getByFilterPagedQuestionOfExams,
  fileUpload,
  getAddQuestionOfExams,
  getUpdateQuestionOfExams,
};

export default publisherServices;