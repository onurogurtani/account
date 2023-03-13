import { lazy } from 'react';

const TeacherList = lazy(() =>
    import('./TeacherList').then(({ default: Component }) => ({
        default: Component,
    })),
);

const Teachers = {
    TeacherList,
};

export default Teachers;
