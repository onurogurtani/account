import { lazy } from 'react';

const AdminUserList = lazy(() =>
  import('./AdminUserList').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AdminUserCreate = lazy(() =>
  import('./AdminUserCreate').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AdminUsersManagement = {
  AdminUserList,
  AdminUserCreate,
};

export default AdminUsersManagement;
