import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusLessons } from '../../../store/slice/lessonsSlice';
import { editUnits, setStatusUnits, setUnitStatus } from '../../../store/slice/lessonUnitsSlice';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import Toolbar from './Toolbar';

const Unit = ({ unit, open, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const updateUnit = async (value) => {
        const entity = {
            entity: {
                id: unit.id,
                name: value.name,
                lessonId: unit.lessonId,
                isActive: parentIsActive ? unit.isActive : false,
            },
        };
        await dispatch(editUnits(entity)).unwrap();
    };

    const statusAction = async (status) => {
        await dispatch(setUnitStatus({ id: unit.id, isActive: status })).unwrap();
        dispatch(setStatusUnits({ data: unit.id, status }));

        if (!status) return false;
        dispatch(setStatusLessons({ data: unit.lessonId, status }));
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
        parentIsActive,
        selectedKey: { id: unit.id, type: 'unit' },
    };
    return (
        <>
            <div style={{ opacity: parentIsActive ? (unit.isActive ? 1 : 0.4) : 0.4 }}>
                <AcquisitionTreeCreateOrEdit
                    initialValue={unit}
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
