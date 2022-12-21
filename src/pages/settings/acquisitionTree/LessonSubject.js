import { Collapse, Typography } from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { deleteLessonSubjects, editLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { addLessonSubSubjects, getLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getListFilterParams } from '../../../utils/utils';
import LessonSubSubject from './LessonSubSubject';
import Toolbar from './Toolbar';

const { Panel } = Collapse;
const { Title } = Typography;
const LessonSubjects = ({ lessonSubject }) => {
  const dispatch = useDispatch();
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);

  const onChange = (key) => {
    setOpen((prev) => !prev);
    if (!key.toString()) return false;
    dispatch(getLessonSubSubjects(getListFilterParams('lessonSubjectId', Number(key.toString()))));
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
  const addlessonSubSubject = async (value) => {
    const entity = {
      entity: {
        name: value,
        lessonSubjectId: lessonSubject.id,
      },
    };
    await dispatch(addLessonSubSubjects(entity));
  };

  const toolbarProps = {
    addText: 'Alt Başlık Ekle',
    editText: 'Konuyu Düzenle',
    deleteText: 'Konuyu Sil',
    open,
    setIsAdd,
    setIsEdit,
    deleteAction: deleteLessonSubject,
  };

  return (
    <Collapse onChange={onChange}>
      <Panel
        extra={<Toolbar {...toolbarProps} />}
        header={
          <EditableInput
            initialValue={lessonSubject.name}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            onEnter={updatelessonSubject}
          />
        }
        key={lessonSubject.id}
      >
        {lessonSubSubjects.length > 0 && <Title level={4}>Alt Başlıklar</Title>}
        <EditableInput height="40" isEdit={isAdd} setIsEdit={setIsAdd} onEnter={addlessonSubSubject} />
        {lessonSubSubjects
          ?.filter((item) => item.lessonSubjectId === lessonSubject.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((i) => (
            <LessonSubSubject key={i.id} lessonSubSubject={i} />
          ))}
      </Panel>
    </Collapse>
  );
};

export default memo(LessonSubjects);
