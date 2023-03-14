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
const ShowForm = lazy(() =>
    import('./surveyManagement/showForm').then(({ default: Component }) => ({
        default: Component,
    })),
);

const AvatarManagement = lazy(() =>
    import('./avatarManagement').then(({ default: Component }) => ({
        default: Component,
    })),
);

const PasswordManagement = lazy(() =>
    import('./passwordManagement').then(({ default: Component }) => ({
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
const EarningsChoice = lazy(() =>
    import('./questionIdentifaction/EarningsChoice').then(({ default: Component }) => ({
        default: Component,
    })),
);

const UserManagement = {
    SurveyManagement,
    AddForm,
    ShowForm,
    AvatarManagement,
    SchoolManagement,
    AnnouncementManagement,
    AddAnnouncement,
    ShowAnnouncement,
    EditAnnouncement,
    PasswordManagement,
    EarningsChoice,
};

export default UserManagement;
