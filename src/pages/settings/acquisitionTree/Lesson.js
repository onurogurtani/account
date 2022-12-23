import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { deleteLessons, editLessons } from '../../../store/slice/lessonsSlice';
import Toolbar from './Toolbar';

const Lesson = ({ lesson, open, setSelectedInsertKey }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const updateLesson = async (value) => {
    const entity = {
      entity: {
        id: lesson.id,
        name: value,
        classroomId: lesson.classroomId,
      },
    };
    await dispatch(editLessons(entity));
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

  const toolbarProps = {
    addText: 'Ünite Ekle',
    editText: 'Dersi Düzenle',
    deleteText: 'Dersi Sil',
    open,
    setIsEdit,
    setSelectedInsertKey,
    deleteAction: deleteLesson,
    selectedKey: lesson.id,
  };
  return (
    <>
      <EditableInput initialValue={lesson.name} isEdit={isEdit} setIsEdit={setIsEdit} onEnter={updateLesson} />
      <Toolbar {...toolbarProps} />
    </>
  );
};

export default memo(Lesson);
