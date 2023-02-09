import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import EditableInput from '../../../components/EditableInput';
import { deleteUnits, editUnits } from '../../../store/slice/lessonUnitsSlice';
import Toolbar from './Toolbar';

const Unit = ({ unit, open, setSelectedInsertKey }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

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

  const toolbarProps = {
    addText: 'Konu Ekle',
    editText: 'Üniteyi Düzenle',
    deleteText: 'Üniteyi Sil',
    open,
    setIsEdit,
    setSelectedInsertKey,
    deleteAction: deleteUnit,
    selectedKey: { id: unit.id, type: 'unit' },
  };
  return (
    <>
      <EditableInput initialValue={unit.name} isEdit={isEdit} setIsEdit={setIsEdit} onEnter={updateUnit} />
      <Toolbar {...toolbarProps} />
    </>
  );
};

export default memo(Unit);
