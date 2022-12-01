import { lazy } from 'react';

const AcademicYear = lazy(() =>
  import('./academicYear').then(({ default: Component }) => ({
    default: Component,
  })),
);

const PreferencePeriod = {
  AcademicYear,
};

export default PreferencePeriod;
