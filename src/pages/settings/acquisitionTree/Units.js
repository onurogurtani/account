import { Collapse, Typography } from 'antd';
import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { addLessonSubjects, getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { deleteUnits, editUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import LessonSubject from './LessonSubject';
import Toolbar from './Toolbar';

const { Panel } = Collapse;
const { Title } = Typography;
const Units = ({ unit }) => {
  console.log(2);
  const dispatch = useDispatch();
  const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);

  const onChange = (key) => {
    setOpen((prev) => !prev);
    if (!key.toString()) return false;
    dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', Number(key.toString()))));
  };

  const deleteUnit = async () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Tüm ilişkili bağlantılar silinecektir. Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        try {
          await dispatch(deleteUnits(unit.id)).unwrap();
        } catch (err) {
          errorDialog({ title: <Text t="error" />, message: err.message });
        }
      },
    });
  };
  const updateUnit = async (value) => {
    const entity = {
      entity: {
        id: unit.id,
        name: value,
        lessonId: unit.lessonId,
      },
    };
    await dispatch(editUnits(entity));
  };
  const addSubject = async (value) => {
    const entity = {
      entity: {
        name: value,
        lessonUnitId: unit.id,
      },
    };
    await dispatch(addLessonSubjects(entity));
  };
  const toolbarProps = {
    addText: 'Konu Ekle',
    editText: 'Üniteyi Düzenle',
    deleteText: 'Üniteyi Sil',
    open,
    setIsAdd,
    setIsEdit,
    deleteAction: deleteUnit,
  };

  return (
    <Collapse onChange={onChange}>
      <Panel
        header={<EditableInput initialValue={unit.name} isEdit={isEdit} setIsEdit={setIsEdit} onEnter={updateUnit} />}
        key={unit.id}
        extra={<Toolbar {...toolbarProps} />}
      >
        {lessonSubjects.length > 0 && <Title level={4}>Konular</Title>}
        <EditableInput height="40" isEdit={isAdd} setIsEdit={setIsAdd} onEnter={addSubject} />
        {lessonSubjects
          ?.filter((item) => item.lessonUnitId === unit.id)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((i) => (
            <LessonSubject key={i.id} lessonSubject={i} />
          ))}
      </Panel>
    </Collapse>
  );
};

export default memo(Units);
