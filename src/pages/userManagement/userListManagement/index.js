import { lazy } from 'react';

const UserList = lazy(() =>
  import('./UserList').then(({ default: Component }) => ({
    default: Component,
  })),
);
const UserCreate = lazy(() =>
  import('./UserCreate').then(({ default: Component }) => ({
    default: Component,
  })),
);

const UserListManagement = {
  UserList,
  UserCreate,
};

export default UserListManagement;
