import { lazy } from 'react';

const TeacherList = lazy(() =>
    import('./TeacherList').then(({ default: Component }) => ({
        default: Component,
    })),
);

const TeacherAddEdit = lazy(() =>
    import('./TeacherAddEdit').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Teachers = {
    TeacherList,
    TeacherAddEdit,
};

export default Teachers;
