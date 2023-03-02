import { lazy } from 'react';

const VideoReports = lazy(() =>
    import('./videoReports/index').then(({ default: Component }) => ({
        default: Component,
    })),
);
const WorkPlanVideoReportsAdd = lazy(() =>
    import('./workPlanVideosRaporsAdd/index').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Reports = {
    VideoReports,
    WorkPlanVideoReportsAdd,
};

export default Reports;
