import { lazy } from 'react';

const SurveyManagement = lazy(() =>
  import('./surveyManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);

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

const AvatarManagement = lazy(() =>
  import('./avatarManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);

const SchoolManagement = lazy(() =>
  import('./schoolManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);



const UserManagement = {
  SurveyManagement,
  RoleManagement,
  OperationManagement,
  RoleOperationConnect,
  UserListManagement,
  AddUser,
  EditUser,
  AvatarManagement,
  SchoolManagement
};

export default UserManagement;
