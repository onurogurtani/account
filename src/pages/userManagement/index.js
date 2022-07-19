import { lazy } from 'react';

const RoleManagement = lazy(() =>
  import('./roleManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);

const OperationManagement = lazy(() =>
  import('./operationManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);

const RoleOperationConnect = lazy(() =>
  import('./roleOperationConnect').then(({ default: Component }) => ({
    default: Component,
  })),
);

const UserManagement = {
  RoleManagement,
  OperationManagement,
  RoleOperationConnect
};

export default UserManagement;
