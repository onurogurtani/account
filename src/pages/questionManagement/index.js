import { lazy } from 'react';

const AdQuestinFile = lazy(() =>
  import('./addQuestionFile/index').then(({ default: Component }) => ({
    default: Component,
  })),
);
const QuestionIdentification = lazy(() =>
  import('./questionIdentification').then(({ default: Component }) => ({
    default: Component,
  })),
);

const QuestionManagement = {
  AdQuestinFile,
  QuestionIdentification,
};

export default QuestionManagement;
