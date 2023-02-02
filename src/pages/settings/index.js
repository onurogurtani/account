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
  import('./acquisitionTree/AcquisitionTreeList').then(({ default: Component }) => ({
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

const Branch = lazy(() =>
  import('./branch').then(({ default: Component }) => ({
    default: Component,
  })),
);
const PublisherBook = lazy(() =>
  import('./publisherBook').then(({ default: Component }) => ({
    default: Component,
  })),
);
const Publisher = lazy(() =>
  import('./publisher').then(({ default: Component }) => ({
    default: Component,
  })),
);
const TrialType = lazy(() =>
  import('./trialType').then(({ default: Component }) => ({
    default: Component,
  })),
);
const OrganisationTypes = lazy(() =>
  import('./organisationTypes/OrganisationTypesList').then(({ default: Component }) => ({
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
  Branch,
  PackagesType,
  TargetScreen,
  AcademicYear,
  TargetSentence,
  PreferencePeriod,
  PublisherBook,
  Publisher,
  TrialType,
  OrganisationTypes,
};

export default Settings;
