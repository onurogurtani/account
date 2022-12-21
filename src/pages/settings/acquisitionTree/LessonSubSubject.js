import { Space } from 'antd';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { deleteLessonSubSubjects, editLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import Toolbar from './Toolbar';

const LessonSubSubjects = ({ lessonSubSubject }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

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

  const updatelessonSubSubject = async (value) => {
    const entity = {
      entity: {
        id: lessonSubSubject.id,
        name: value,
        lessonSubjectId: lessonSubSubject.lessonSubjectId,
      },
    };
    await dispatch(editLessonSubSubjects(entity));
  };
  const toolbarProps = {
    editText: 'Alt Başlığı Düzenle',
    deleteText: 'Alt Başlığı Sil',
    open,
    setIsEdit,
    hidePlusButton: true,
    deleteAction: deleteLessonSubSubject,
  };
  return (
    <div className="mb-3">
      <Space align="baseline">
        <EditableInput
          initialValue={lessonSubSubject.name}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          height="40"
          onEnter={updatelessonSubSubject}
        />
        <Toolbar {...toolbarProps} />
      </Space>
    </div>
  );
};

export default memo(LessonSubSubjects);
