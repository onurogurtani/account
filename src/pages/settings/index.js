import { lazy } from 'react';

const Categories = lazy(() =>
  import('./categories').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Packages = lazy(() =>
  import('./packages').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AddPackages = lazy(() =>
  import('./packages/AddPackages').then(({ default: Component }) => ({
    default: Component,
  })),
);
const EditPackages = lazy(() =>
  import('./packages/EditPackages').then(({ default: Component }) => ({
    default: Component,
  })),
);

const Lessons = lazy(() =>
  import('./lessons').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Activities = lazy(() =>
  import('./activities').then(({ default: Component }) => ({
    default: Component,
  })),
);

const ClassStages = lazy(() =>
  import('./classStages').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AnnouncementType = lazy(() =>
  import('./announcementType').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AcademicYear = lazy(() =>
  import('./academicYear').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Settings = {
  Categories,
  Packages,
  AddPackages,
  EditPackages,
  Lessons,
  Activities,
  ClassStages,
  AnnouncementType,
  AcademicYear,
};

export default Settings;
