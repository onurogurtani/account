import { Space } from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import {
    deleteLessonSubSubjects,
    editLessonSubSubjects,
    setStatusLessonSubSubjects,
} from '../../../store/slice/lessonSubSubjectsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const LessonSubSubject = ({ lessonSubSubject, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const updatelessonSubSubject = async (value) => {
        const entity = {
            entity: {
                id: lessonSubSubject.id,
                name: value,
                lessonSubjectId: lessonSubSubject.lessonSubjectId,
                isActive: lessonSubSubject.isActive,
            },
        };
        await dispatch(editLessonSubSubjects(entity)).unwrap();
    };

    const deleteLessonSubSubject = async () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Tüm ilişkili bağlantılar silinecektir. Silmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                try {
                    await dispatch(deleteLessonSubSubjects(lessonSubSubject.id)).unwrap();
                } catch (err) {
                    errorDialog({ title: <Text t="error" />, message: err.message });
                }
            },
        });
    };

    const statusAction = () => {
        dispatch(setStatusLessonSubSubjects({ data: [lessonSubSubject.id], status: !lessonSubSubject?.isActive }));
    };

    const toolbarProps = {
        editText: 'Alt Başlığı Düzenle',
        statusText: lessonSubSubject.name + ' Ayracı pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: lessonSubSubject?.isActive,
        setIsEdit,
        hidePlusButton: true,
        setSelectedInsertKey,
        statusAction,
        selectedKey: lessonSubSubject.id,
    };
    return (
        <Space align="baseline">
            <div style={{ opacity: isEdit || lessonSubSubject.isActive ? 1 : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={lessonSubSubject.name}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updatelessonSubSubject}
                    code
                />
            </div>

            <Toolbar {...toolbarProps} />
        </Space>
    );
};

export default memo(LessonSubSubject);
