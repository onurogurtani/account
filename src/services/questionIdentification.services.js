import axios from 'axios';
import { api } from './api';
const getByFilterPagedQuestionOfExams = (data) => {
  return api({
    url: 'QuestionOfExams/GetByFilterPagedQuestionOfExams',
    method: 'POST',
    params: data,
  });
};
const getAddQuestionOfExams = (data) => {
  return api({
    url: 'QuestionOfExams',
    method: 'POST',
    params: data,
  });
};
const fileUpload = (data, options) => {
  return axios.post(`${process.env.PUBLIC_HOST_API}/Files`, data, { ...options });
};

const publisherServices = {
  getByFilterPagedQuestionOfExams,
  fileUpload,
  getAddQuestionOfExams,
};

export default publisherServices;
