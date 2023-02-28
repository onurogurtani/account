import { lazy } from 'react';

const RoleAuthorizationList = lazy(() =>
    import('./RoleAuthorizationList').then(({ default: Component }) => ({
        default: Component,
    })),
);

const RoleAuthorizationManagement = {
    RoleAuthorizationList,
};

export default RoleAuthorizationManagement;
