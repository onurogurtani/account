import { lazy } from 'react';

const QuestionDifficultyList = lazy(() =>
  import('./QuestionDifficultyList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const QuestionDifficultyReports = {
  QuestionDifficultyList,
};

export default QuestionDifficultyReports;
