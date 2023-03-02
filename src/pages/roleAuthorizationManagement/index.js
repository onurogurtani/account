import { lazy } from 'react';

const RoleAuthorizationList = lazy(() =>
    import('./RoleAuthorizationList').then(({ default: Component }) => ({
        default: Component,
    })),
);
const RoleAuthorizationCreateOrEdit = lazy(() =>
    import('./RoleAuthorizationCreateOrEdit').then(({ default: Component }) => ({
        default: Component,
    })),
);

const RoleAuthorizationManagement = {
    RoleAuthorizationList,
    RoleAuthorizationCreateOrEdit,
};

export default RoleAuthorizationManagement;
