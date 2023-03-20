import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import { deleteLessons, editLessons, setStatusLessons } from '../../../store/slice/lessonsSlice';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { setStatusUnits } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Lesson = ({ lesson, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

    const updateLesson = async (value) => {
        const entity = {
            entity: {
                id: lesson.id,
                name: value,
                classroomId: lesson.classroomId,
                isActive: lesson.isActive,
            },
        };
        await dispatch(editLessons(entity)).unwrap();
    };

    const deleteLesson = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Tüm ilişkili bağlantılar silinecektir. Silmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                try {
                    await dispatch(deleteLessons(lesson.id)).unwrap();
                } catch (err) {
                    errorDialog({ title: <Text t="error" />, message: err.message });
                }
            },
        });
    };
    const statusAction = () => {
        dispatch(setStatusLessons(lesson.id));
        const lessonUnitIds = lessonUnits.filter((item) => item.lessonId === lesson.id).map((i) => i.id);
        dispatch(setStatusUnits({ data: lessonUnitIds, status: !lesson.isActive }));
        const lessonSubjectIds = lessonSubjects
            .filter((item) => lessonUnitIds.includes(item.lessonUnitId))
            .map((i) => i.id);
        dispatch(setStatusLessonSubjects({ data: lessonSubjectIds, status: !lesson.isActive }));
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
        selectedKey: { id: lesson.id, type: 'lesson' },
    };
    return (
        <>
            <div style={{ opacity: lesson.isActive ? 1 : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lesson.name}
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
