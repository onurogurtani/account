import { lazy } from 'react';

const SurveyManagement = lazy(() =>
  import('./surveyManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AddForm = lazy(() =>
  import('./surveyManagement/addForm').then(({ default: Component }) => ({
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

const AnnouncementManagement = lazy(() =>
  import('./announcementManagement').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AddAnnouncement = lazy(() =>
  import('./announcementManagement/addAnnouncement').then(({ default: Component }) => ({
    default: Component,
  })),
);
const ShowAnnouncement = lazy(() =>
  import('./announcementManagement/showAnnouncement').then(({ default: Component }) => ({
    default: Component,
  })),
);
const EditAnnouncement = lazy(() =>
  import('./announcementManagement/editAnnouncement').then(({ default: Component }) => ({
    default: Component,
  })),
);

const UserManagement = {
  SurveyManagement,
  AddForm,
  RoleManagement,
  OperationManagement,
  RoleOperationConnect,
  AvatarManagement,
  SchoolManagement,
  AnnouncementManagement,
  AddAnnouncement,
  ShowAnnouncement,
  EditAnnouncement,
};

export default UserManagement;
