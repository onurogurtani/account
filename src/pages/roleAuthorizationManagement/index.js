import { lazy } from 'react';

const RoleAuthorizationList = lazy(() =>
    import('./RoleAuthorizationList').then(({ default: Component }) => ({
        default: Component,
    })),
);
const RoleAuthorizationAdd = lazy(() =>
    import('./RoleAuthorizationAdd').then(({ default: Component }) => ({
        default: Component,
    })),
);

const RoleAuthorizationManagement = {
    RoleAuthorizationList,
    RoleAuthorizationAdd,
};

export default RoleAuthorizationManagement;
