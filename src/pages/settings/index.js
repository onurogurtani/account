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

const AcademicYear = lazy(() =>
  import('./academicYear').then(({ default: Component }) => ({
    default: Component,
  })),
);
const TargetSentence = lazy(() =>
  import('./targetSentence').then(({ default: Component }) => ({
    default: Component,
  })),
);

const PreferencePeriod = lazy(() =>
  import('./preferencePeriod').then(({ default: Component }) => ({
    default: Component,
  })),
);
const TargetScreen = lazy(() =>
  import('./targetScreen').then(({ default: Component }) => ({
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
  TargetScreen,
  AcademicYear,
  TargetSentence,
  PreferencePeriod,
};

export default Settings;
