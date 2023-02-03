import { api } from './api';

const getTrialType = (data = {}) => {
  return api({
    url: `Exam/TestExamTypes/GetByFilterPagedTestExamTypes`,
    method: 'POST',
    data: data,
  });
};
const getTrialTypeAdd = (data = {}) => {
  return api({
    url: `/Exam/TestExamTypes/Add`,
    method: 'POST',
    data: data,
  });
};
const getTrialTypeUpdate = (data = {}) => {
  return api({
    url: `/Exam/TestExamTypes/Update`,
    method: 'PUT',
    data: data,
  });
};
const targetSentenceServices = {
  getTrialType,
  getTrialTypeUpdate,
  getTrialTypeAdd,
};

export default targetSentenceServices;
