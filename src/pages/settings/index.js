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
const PackagesType = lazy(() =>
  import('./packagesType').then(({ default: Component }) => ({
    default: Component,
  })),
);

const Settings = {
  Categories,
  Packages,
  Lessons,
  Activities,
  ClassStages,
  AnnouncementType,
  PackagesType,
};

export default Settings;
