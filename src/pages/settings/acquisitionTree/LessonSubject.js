import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import {
    deleteLessonSubjects,
    editLessonSubjects,
    setStatusLessonSubjects,
} from '../../../store/slice/lessonSubjectsSlice';
import { setStatusLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonSubject = ({ lessonSubject, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

    const updatelessonSubject = async (value) => {
        const entity = {
            entity: {
                id: lessonSubject.id,
                name: value,
                lessonUnitId: lessonSubject.lessonUnitId,
                isActive: lessonSubject.isActive,
            },
        };
        await dispatch(editLessonSubjects(entity)).unwrap();
    };

    const deleteLessonSubject = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Tüm ilişkili bağlantılar silinecektir. Silmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                try {
                    await dispatch(deleteLessonSubjects(lessonSubject.id)).unwrap();
                } catch (err) {
                    errorDialog({ title: <Text t="error" />, message: err.message });
                }
            },
        });
    };

    const statusAction = () => {
        dispatch(setStatusLessonSubjects({ data: [lessonSubject.id], status: !lessonSubject?.isActive }));
        const lessonSubSubjectIds = lessonSubSubjects
            .filter((item) => item.lessonSubjectId === lessonSubject.id)
            .map((i) => i.id);
        dispatch(setStatusLessonSubSubjects({ data: lessonSubSubjectIds, status: !lessonSubject.isActive }));
    };

    const toolbarProps = {
        addText: 'Alt Başlık Ekle',
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
                    initialValue={lessonSubject.name}
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
