import React, { memo, useState } from 'react';
import { Collapse, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Units from './Units';
import { getListFilterParams } from '../../../utils/utils';
import { addUnits, getUnits } from '../../../store/slice/lessonUnitsSlice';
import EditableInput from '../../../components/EditableInput';
import { deleteLessons, editLessons } from '../../../store/slice/lessonsSlice';
import Toolbar from './Toolbar';
import { confirmDialog, errorDialog, Text } from '../../../components';

const { Panel } = Collapse;
const { Title } = Typography;
const Lessons = ({ lesson }) => {
  const dispatch = useDispatch();
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(1);
  const onChange = (key) => {
    setOpen((prev) => !prev);
    if (!key.toString()) return false;
    dispatch(getUnits(getListFilterParams('lessonId', Number(key.toString()))));
  };

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

  const addUnit = async (value) => {
    const entity = {
      entity: {
        name: value,
        lessonId: lesson.id,
      },
    };
    await dispatch(addUnits(entity));
  };
  const toolbarProps = {
    addText: 'Ünite Ekle',
    editText: 'Dersi Düzenle',
    deleteText: 'Dersi Sil',
    open,
    setIsAdd,
    setIsEdit,
    deleteAction: deleteLesson,
  };

  return (
    <Collapse onChange={onChange}>
      <Panel
        header={
          <EditableInput initialValue={lesson.name} isEdit={isEdit} setIsEdit={setIsEdit} onEnter={updateLesson} />
        }
        key={lesson.id}
        extra={<Toolbar {...toolbarProps} />}
      >
        {lessonUnits.length > 0 && <Title level={4}>Üniteler</Title>}
        <EditableInput height="40" isEdit={isAdd} setIsEdit={setIsAdd} onEnter={addUnit} />
        {lessonUnits
          ?.filter((item) => item.lessonId === lesson.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((i) => (
            <Units key={i.id} unit={i} />
          ))}
      </Panel>
    </Collapse>
  );
};

export default memo(Lessons);
