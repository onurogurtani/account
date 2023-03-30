import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import {
    editLessonBrackets,
    setLessonBracketStatus,
    setStatusLessonBrackets,
} from '../../../store/slice/lessonBracketsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';
import { setStatusLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { setStatusUnits } from '../../../store/slice/lessonUnitsSlice';
import { setStatusLessons } from '../../../store/slice/lessonsSlice';

const LessonBracket = ({ lessonBracket, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);

    const updateLessonBracket = async (value) => {
        const entity = {
            entity: {
                id: lessonBracket.id,
                name: value.name,
                code: value.code,
                lessonAcquisitionId: lessonBracket.lessonAcquisitionId,
                isActive: lessonBracket.isActive,
            },
        };
        await dispatch(editLessonBrackets(entity)).unwrap();
    };

    const statusAction = async (status) => {
        await dispatch(setLessonBracketStatus({ id: lessonBracket.id, isActive: status })).unwrap();
        dispatch(setStatusLessonBrackets({ data: lessonBracket.id, status }));
        if (!status) return false;

        dispatch(setStatusLessonAcquisitions({ data: lessonBracket.lessonAcquisitionId, status }));
        const lessonSubjectId = lessonAcquisitions.find(
            (item) => item.id === lessonBracket.lessonAcquisitionId,
        ).lessonSubjectId;
        dispatch(setStatusLessonSubjects({ data: lessonSubjectId, status }));
        const lessonUnitId = lessonSubjects.find((item) => item.id === lessonSubjectId).lessonUnitId;
        dispatch(setStatusUnits({ data: lessonUnitId, status }));
        const lessonId = lessonUnits.find((item) => item.id === lessonUnitId).lessonId;
        dispatch(setStatusLessons({ data: lessonId, status }));
    };

    const toolbarProps = {
        editText: 'Ayracı Düzenle',
        statusText: lessonBracket.name + ' Ayracı pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lessonBracket?.isActive,
        setIsEdit,
        hidePlusButton: true,
        setSelectedInsertKey,
        statusAction,
        parentIsActive,
        selectedKey: lessonBracket.id,
    };
    return (
        <Space align="baseline">
            <div style={{ opacity: isEdit || parentIsActive ? (lessonBracket.isActive ? 1 : 0.4) : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lessonBracket}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updateLessonBracket}
                    code
                />
            </div>

            <Toolbar {...toolbarProps} />
        </Space>
    );
};

export default memo(LessonBracket);
