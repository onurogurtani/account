import { lazy } from 'react';

const OrganisationList = lazy(() =>
  import('./OrganisationList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const OrganisationManagement = {
  OrganisationList,
};

export default OrganisationManagement;
