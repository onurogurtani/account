import { lazy } from 'react';

const TrialExam = lazy(() =>
    import('./trialExam/index').then(({ default: Component }) => ({
        default: Component,
    })),
);
const TrialExamList = lazy(() =>
    import('./trialExam/list/index').then(({ default: Component }) => ({
        default: Component,
    })),
);
const Exam = {
    TrialExam,
    TrialExamList,
};

export default Exam;
