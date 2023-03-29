import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Space } from 'antd';
import {
    editLessonBrackets,
    setLessonBracketStatus,
    setStatusLessonBrackets,
} from '../../../store/slice/lessonBracketsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonBracket = ({ lessonBracket, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

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

    const statusAction = async () => {
        await dispatch(setLessonBracketStatus({ id: lessonBracket.id, isActive: !lessonBracket.isActive })).unwrap();
        dispatch(setStatusLessonBrackets({ data: [lessonBracket.id], status: !lessonBracket?.isActive }));
    };

    const toolbarProps = {
        editText: 'Ayracı Düzenle',
        statusText: lessonBracket.name + ' Ayracı pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lessonBracket?.isActive,
        setIsEdit,
        hidePlusButton: true,
        setSelectedInsertKey,
        statusAction,
        selectedKey: lessonBracket.id,
    };
    return (
        <Space align="baseline">
            <div style={{ opacity: isEdit || lessonBracket.isActive ? 1 : 0.4 }}>
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
