import { lazy } from 'react';

const OrganisationList = lazy(() =>
  import('./OrganisationList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const OrganisationCreateOrUpdate = lazy(() =>
  import('./OrganisationCreateOrUpdate').then(({ default: Component }) => ({
    default: Component,
  })),
);
const OrganisationShow = lazy(() =>
  import('./showOrganisation/OrganisationShow').then(({ default: Component }) => ({
    default: Component,
  })),
);

const OrganisationManagement = {
  OrganisationList,
  OrganisationCreateOrUpdate,
  OrganisationShow,
};

export default OrganisationManagement;
