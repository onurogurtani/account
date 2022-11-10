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
  }))
  );


const Settings = {
  Categories,
  Packages,
  Lessons,
  Activities
};

export default Settings;
