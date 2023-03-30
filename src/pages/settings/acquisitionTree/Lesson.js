import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editLessons, setLessonStatus, setStatusLessons } from '../../../store/slice/lessonsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Lesson = ({ lesson, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const updateLesson = async (value) => {
        const entity = {
            entity: {
                id: lesson.id,
                name: value.name,
                classroomId: lesson.classroomId,
                isActive: lesson.isActive,
            },
        };
        await dispatch(editLessons(entity)).unwrap();
    };

    const statusAction = async (status) => {
        await dispatch(setLessonStatus({ id: lesson.id, isActive: status })).unwrap();
        dispatch(setStatusLessons({ data: lesson.id, status }));
    };
    const toolbarProps = {
        addText: 'Ünite Ekle',
        editText: 'Dersi Düzenle',
        statusText:
            lesson.name +
            ' dersi ve ' +
            lesson.name +
            ' dersine tanımlanmış tüm ünite, konu, kazanım ve ayraçlar pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lesson?.isActive,
        open,
        setIsEdit,
        setSelectedInsertKey,
        statusAction,
        parentIsActive: true,
        selectedKey: { id: lesson.id, type: 'lesson' },
    };
    return (
        <>
            <div style={{ opacity: lesson.isActive ? 1 : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lesson}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updateLesson}
                />
            </div>
            <Toolbar {...toolbarProps} />
        </>
    );
};

export default memo(Lesson);
