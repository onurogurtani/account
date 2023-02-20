import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { deleteLessonSubjects, editLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import Toolbar from './Toolbar';

const LessonSubject = ({ lessonSubject, open, setSelectedInsertKey }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const updatelessonSubject = async (value) => {
    const entity = {
      entity: {
        id: lessonSubject.id,
        name: value,
        lessonUnitId: lessonSubject.lessonUnitId,
      },
    };
    await dispatch(editLessonSubjects(entity));
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

  const toolbarProps = {
    addText: 'Alt Başlık Ekle',
    editText: 'Konuyu Düzenle',
    deleteText: 'Konuyu Sil',
    open,
    setIsEdit,
    setSelectedInsertKey,
    deleteAction: deleteLessonSubject,
    selectedKey: { id: lessonSubject.id, type: 'lessonSubject' },
  };
  return (
    <>
      <EditableInput
        initialValue={lessonSubject.name}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        onEnter={updatelessonSubject}
      />
      <Toolbar {...toolbarProps} />
    </>
  );
};

export default memo(LessonSubject);
