import { lazy } from 'react';

const QuestionDifficultyList = lazy(() =>
  import('./QuestionDifficultyList').then(({ default: Component }) => ({
    default: Component,
  })),
);
const QuestionDifficultyDetail = lazy(() =>
  import('./QuestionDifficultyDetail').then(({ default: Component }) => ({
    default: Component,
  })),
);

const QuestionDifficultyReports = {
  QuestionDifficultyList,
  QuestionDifficultyDetail,
};

export default QuestionDifficultyReports;
