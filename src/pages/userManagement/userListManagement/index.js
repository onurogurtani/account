import { lazy } from 'react';

const UserList = lazy(() =>
  import('./UserList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const UserListManagement = {
  UserList,
};

export default UserListManagement;
