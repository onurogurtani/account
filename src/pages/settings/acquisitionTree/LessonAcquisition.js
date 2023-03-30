import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    editLessonAcquisitions,
    setLessonAcquisitionStatus,
    setStatusLessonAcquisitions,
} from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessons } from '../../../store/slice/lessonsSlice';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { setStatusUnits } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonAcquisition = ({ lessonAcquisition, open, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);

    const updateLessonAcquisition = async (value) => {
        const entity = {
            entity: {
                id: lessonAcquisition.id,
                name: value.name,
                code: value.code,
                lessonSubjectId: lessonAcquisition.lessonSubjectId,
                isActive: lessonAcquisition.isActive,
            },
        };
        await dispatch(editLessonAcquisitions(entity)).unwrap();
    };

    const statusAction = async (status) => {
        await dispatch(setLessonAcquisitionStatus({ id: lessonAcquisition.id, isActive: status })).unwrap();
        dispatch(setStatusLessonAcquisitions({ data: lessonAcquisition.id, status }));

        if (!status) return false;
        dispatch(setStatusLessonSubjects({ data: lessonAcquisition.lessonSubjectId, status }));
        const lessonUnitId = lessonSubjects.find((item) => item.id === lessonAcquisition.lessonSubjectId).lessonUnitId;
        dispatch(setStatusUnits({ data: lessonUnitId, status }));
        const lessonId = lessonUnits.find((item) => item.id === lessonUnitId).lessonId;
        dispatch(setStatusLessons({ data: lessonId, status }));
    };

    const toolbarProps = {
        addText: 'Ayraç Ekle',
        editText: 'Kazanımı Düzenle',
        statusText:
            lessonAcquisition.name +
            ' kazanımı ve ' +
            lessonAcquisition.name +
            ' kazanımına tanımlanmış ayraçlar pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lessonAcquisition?.isActive,
        open,
        setIsEdit,
        setSelectedInsertKey,
        statusAction,
        parentIsActive,
        selectedKey: { id: lessonAcquisition.id, type: 'lessonAcquisition' },
    };
    return (
        <>
            <div style={{ opacity: parentIsActive ? (lessonAcquisition.isActive ? 1 : 0.4) : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lessonAcquisition}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updateLessonAcquisition}
                    code
                />
            </div>
            <Toolbar {...toolbarProps} />
        </>
    );
};

export default memo(LessonAcquisition);
