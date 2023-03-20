import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog, errorDialog, Text } from '../../../components';
import { setStatusLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { deleteUnits, editUnits, setStatusUnits } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Unit = ({ unit, open, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);

    const updateUnit = async (value) => {
        const entity = {
            entity: {
                id: unit.id,
                name: value,
                lessonId: unit.lessonId,
                isActive: unit.isActive,
            },
        };
        await dispatch(editUnits(entity)).unwrap();
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

    const statusAction = () => {
        dispatch(setStatusUnits({ data: [unit.id], status: !unit?.isActive }));
        const lessonSubjectIds = lessonSubjects.filter((item) => item.lessonUnitId === unit.id).map((i) => i.id);
        dispatch(setStatusLessonSubjects({ data: lessonSubjectIds, status: !unit.isActive }));
    };
    const toolbarProps = {
        addText: 'Konu Ekle',
        editText: 'Üniteyi Düzenle',
        statusText:
            unit.name +
            ' ünitesi ve ' +
            unit.name +
            ' ünitesine tanımlanmış tüm konu, kazanım ve ayraçlar pasife alınacaktır. Pasife alma işlemini onaylıyor musunuz?',
        isActive: unit?.isActive,
        open,
        setIsEdit,
        setSelectedInsertKey,
        statusAction,
        selectedKey: { id: unit.id, type: 'unit' },
    };
    return (
        <>
            <div style={{ opacity: unit.isActive ? 1 : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={unit.name}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    onEnter={updateUnit}
                />
            </div>
            <Toolbar {...toolbarProps} />
        </>
    );
};

export default memo(Unit);
