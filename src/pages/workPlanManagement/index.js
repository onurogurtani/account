import { lazy } from 'react';

const WorkPlanList = lazy(() =>
  import('./WorkPlanList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AddWorkPlan = lazy(() =>
  import('./addWorkPlan/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const EditWorkPlan = lazy(() =>
  import('./editWorkPlan/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const CopyWorkPlan = lazy(() =>
  import('./copyWorkPlan/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const WorkPlanListManagement = {
  WorkPlanList,
  AddWorkPlan,
  EditWorkPlan,
  CopyWorkPlan
};

export default WorkPlanListManagement;
