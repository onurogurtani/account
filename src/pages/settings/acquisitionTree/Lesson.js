import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { setStatusLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import { editLessons, setLessonStatus, setStatusLessons } from '../../../store/slice/lessonsSlice';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { setStatusUnits } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Lesson = ({ lesson, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const { lessonBrackets } = useSelector((state) => state?.lessonBrackets);

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

        if (!status) {
            const lessonUnitIds = lessonUnits.filter((item) => item.lessonId === lesson.id).map((i) => i.id);
            dispatch(setStatusUnits({ data: lessonUnitIds, status }));
            const lessonSubjectIds = lessonSubjects.filter((item) => lessonUnitIds.includes(item.lessonUnitId)).map((i) => i.id);
            dispatch(setStatusLessonSubjects({ data: lessonSubjectIds, status }));
            const lessonAcquisitionIds = lessonAcquisitions.filter((item) => lessonSubjectIds.includes(item.lessonSubjectId)).map((i) => i.id)
            dispatch(setStatusLessonAcquisitions({ data: lessonAcquisitionIds, status }));
            const lessonBracketIds = lessonBrackets.filter((item) => lessonAcquisitionIds.includes(item.lessonAcquisitionId)).map((i) => i.id)
            dispatch(setStatusLessonBrackets({ data: lessonBracketIds, status }));
        }
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
