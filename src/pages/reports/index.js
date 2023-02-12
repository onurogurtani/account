import { lazy } from 'react';

const VideoReports = lazy(() =>
  import('./videoReports/index').then(({ default: Component }) => ({
    default: Component,
  })),
);

const Reports = {
  VideoReports,
};

export default Reports;
