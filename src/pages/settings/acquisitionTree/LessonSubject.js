import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import {
    editLessonSubjects,
    setLessonSubjectStatus,
    setStatusLessonSubjects,
} from '../../../store/slice/lessonSubjectsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonSubject = ({ lessonSubject, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

    const updatelessonSubject = async (value) => {
        const entity = {
            entity: {
                id: lessonSubject.id,
                name: value.name,
                lessonUnitId: lessonSubject.lessonUnitId,
                isActive: lessonSubject.isActive,
            },
        };
        await dispatch(editLessonSubjects(entity)).unwrap();
    };

    const statusAction = async () => {
        await dispatch(setLessonSubjectStatus({ id: lessonSubject.id, isActive: !lessonSubject.isActive })).unwrap();
        dispatch(setStatusLessonSubjects({ data: [lessonSubject.id], status: !lessonSubject?.isActive }));
        const lessonAcquisitionIds = lessonAcquisitions
            .filter((item) => item.lessonSubjectId === lessonSubject.id)
            .map((i) => i.id);
        dispatch(setStatusLessonAcquisitions({ data: lessonAcquisitionIds, status: !lessonSubject.isActive }));
        const lessonBracketIds = lessonBrackets
            .filter((item) => lessonAcquisitionIds.includes(item.lessonAcquisitionId))
            .map((i) => i.id);
        dispatch(setStatusLessonBrackets({ data: lessonBracketIds, status: !lessonSubject.isActive }));
    };

    const toolbarProps = {
        addText: 'Kazanım Ekle',
        editText: 'Konuyu Düzenle',
        statusText:
            lessonSubject.name +
            ' konusu ve ' +
            lessonSubject.name +
            ' konusuna tanımlanmış tüm kazanım ve ayraçlar pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lessonSubject?.isActive,
        open,
        setIsEdit,
        setSelectedInsertKey,
        statusAction,
        selectedKey: { id: lessonSubject.id, type: 'lessonSubject' },
    };
    return (
        <>
            <div style={{ opacity: lessonSubject.isActive ? 1 : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lessonSubject}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updatelessonSubject}
                />
            </div>
            <Toolbar {...toolbarProps} />
        </>
    );
};

export default memo(LessonSubject);
