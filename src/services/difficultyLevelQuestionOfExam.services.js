import { api } from './api';

const getByPagedListDifficultyLevelQuestionOfExam = (data) => {
  return api({
    url: `Reporting/DifficultyLevelQuestionOfExam/getByPagedList`,
    method: 'POST',
    data,
  });
};

const difficultyLevelQuestionOfExamServices = {
  getByPagedListDifficultyLevelQuestionOfExam,
};

export default difficultyLevelQuestionOfExamServices;
