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

const WorkPlanListManagement = {
  WorkPlanList,
  AddWorkPlan
};

export default WorkPlanListManagement;
