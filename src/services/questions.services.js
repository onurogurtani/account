import { api } from './api';

//  Questios Type
const getQuestionType = () => {
  return api({
    url: 'Survey/QuestionTypes/getList',
    method: 'POST',
    data: [],
  });
};

//  Questios Type
const getLikertType = () => {
  return api({
    url: `Survey/LikertTypes/getList`,
    method: 'POST',
    data: [],
  });
};

// Questions with filter
const getQuestions = (urlString) => {
  return api({
    url: `Survey/Questions/GetByFilterPagedQuestions?${urlString}`,
    method: 'POST',
  });
};

// Add Question
const addQuestion = (data) => {
  return api({
    url: `Survey/Questions`,
    method: 'POST',
    data,
  });
};

// Update Question
const updateQuestion = (data) => {
  return api({
    url: `Survey/Questions`,
    method: 'PUT',
    data,
  });
};

// Change Questions Status Active
const questionActive = (data) => {
  return api({
    url: `Survey/Questions/SetActiveQuestions`,
    method: 'POST',
    data,
  });
};

// Change Questions Status Passive
const questionPassive = (data) => {
  return api({
    url: `Survey/Questions/SetPassiveQuestions`,
    method: 'POST',
    data,
  });
};

// Question Delete
const questionDelete = (data) => {
  return api({
    url: `Survey/Questions/DeleteQuestions`,
    method: 'DELETE',
    data,
  });
};

const questionServices = {
  getQuestionType,
  getQuestions,
  addQuestion,
  updateQuestion,
  questionActive,
  questionPassive,
  questionDelete,
  getLikertType,
};

export default questionServices;
