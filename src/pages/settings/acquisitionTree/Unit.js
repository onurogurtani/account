import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import { setStatusLessons } from '../../../store/slice/lessonsSlice';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { editUnits, setStatusUnits, setUnitStatus } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Unit = ({ unit, open, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

    const updateUnit = async (value) => {
        const entity = {
            entity: {
                id: unit.id,
                name: value.name,
                lessonId: unit.lessonId,
                isActive: parentIsActive ? unit.isActive : false,
            },
        };
        await dispatch(editUnits(entity)).unwrap();
    };

    const statusAction = async (status) => {
        await dispatch(setUnitStatus({ id: unit.id, isActive: status })).unwrap();
        dispatch(setStatusUnits({ data: unit.id, status }));

        if (!status) {
            const lessonSubjectIds = lessonSubjects.filter((item) => item.lessonUnitId === unit.id).map((i) => i.id);
            dispatch(setStatusLessonSubjects({ data: lessonSubjectIds, status }));
            const lessonAcquisitionIds = lessonAcquisitions.filter((item) => lessonSubjectIds.includes(item.lessonSubjectId)).map((i) => i.id)
            dispatch(setStatusLessonAcquisitions({ data: lessonAcquisitionIds, status }));
            const lessonBracketIds = lessonBrackets.filter((item) => lessonAcquisitionIds.includes(item.lessonAcquisitionId)).map((i) => i.id)
            dispatch(setStatusLessonBrackets({ data: lessonBracketIds, status }));
            return false;
        }
        dispatch(setStatusLessons({ data: unit.lessonId, status }));
    };
    const toolbarProps = {
        addText: 'Konu Ekle',
        editText: 'Üniteyi Düzenle',
        statusText:
            unit.name +
            ' ünitesi ve ' +
            unit.name +
            ' ünitesine tanımlanmış tüm konu, kazanım ve ayraçlar pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: unit?.isActive,
        open,
        setIsEdit,
        setSelectedInsertKey,
        statusAction,
        parentIsActive,
        selectedKey: { id: unit.id, type: 'unit' },
    };
    return (
        <>
            <div style={{ opacity: parentIsActive ? (unit.isActive ? 1 : 0.4) : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={unit}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updateUnit}
                />
            </div>
            <Toolbar {...toolbarProps} />
        </>
    );
};

export default memo(Unit);
