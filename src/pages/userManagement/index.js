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

const UserListManagement = lazy(() =>
  import('./userListManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AddUser = lazy(() =>
  import('./userListManagement/AddUser').then(({ default: Component }) => ({
    default: Component,
  })),
);

const EditUser = lazy(() =>
  import('./userListManagement/EditUser').then(({ default: Component }) => ({
    default: Component,
  })),
);

const UserManagement = {
  RoleManagement,
  OperationManagement,
  RoleOperationConnect,
  UserListManagement,
  AddUser,
  EditUser
};

export default UserManagement;
