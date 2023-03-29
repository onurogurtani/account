import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    editLessonAcquisitions,
    setLessonAcquisitionStatus,
    setStatusLessonAcquisitions,
} from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonAcquisition = ({ lessonAcquisition, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

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

    const statusAction = async () => {
        await dispatch(
            setLessonAcquisitionStatus({ id: lessonAcquisition.id, isActive: !lessonAcquisition.isActive }),
        ).unwrap();
        dispatch(setStatusLessonAcquisitions({ data: [lessonAcquisition.id], status: !lessonAcquisition?.isActive }));
        const lessonBracketIds = lessonBrackets
            .filter((item) => item.lessonAcquisitionId === lessonAcquisition.id)
            .map((i) => i.id);
        dispatch(setStatusLessonBrackets({ data: lessonBracketIds, status: !lessonAcquisition.isActive }));
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
        selectedKey: { id: lessonAcquisition.id, type: 'lessonAcquisition' },
    };
    return (
        <>
            <div style={{ opacity: lessonAcquisition.isActive ? 1 : 0.4 }}>
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
