import { lazy } from 'react';

const TrialExam = lazy(() =>
  import('./trialExam/index').then(({ default: Component }) => ({
    default: Component,
  })),
);

const Exam = {
  TrialExam,
};

export default Exam;
