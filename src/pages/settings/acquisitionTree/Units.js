import { Collapse, Typography } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { addUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import LessonSubjects from './LessonSubjects';
import Unit from './Unit';

const { Panel } = Collapse;
const { Title } = Typography;
const Units = ({ lesson, selectedInsertKey, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const [openedPanels, setOpenedPanels] = useState([]);

    const filteredLessonUnits = useMemo(
        () => lessonUnits?.filter((item) => item.lessonId === lesson.id),
        [lessonUnits, lesson.id],
    );

    const onChange = (key) => {
        setOpenedPanels(key);
        if (!key.toString()) return false;
        if (openedPanels.includes(key.at(-1)?.toString())) return false;
        dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', Number(key.at(-1).toString()))));
    };
    const addUnit = async (value) => {
        const entity = {
            entity: {
                name: value,
                isActive: true,
                lessonId: lesson.id,
            },
        };
        await dispatch(addUnits(entity)).unwrap();
    };
    const isEdit = lesson.id === selectedInsertKey?.id && selectedInsertKey?.type === 'lesson';
    return (
        <>
            {(isEdit || filteredLessonUnits.length !== 0) && <Title level={3}>Üniteler</Title>}
            <br />
            <AcquisitionTreeCreateOrEdit
                height="40"
                isEdit={isEdit}
                setIsEdit={setSelectedInsertKey}
                onEnter={addUnit}
            />
            <Collapse destroyInactivePanel={true} onChange={onChange}>
                {filteredLessonUnits.map((unit) => (
                    <Panel
                        header={
                            <Unit
                                setSelectedInsertKey={setSelectedInsertKey}
                                unit={unit}
                                open={openedPanels.includes(unit.id.toString())}
                            />
                        }
                        key={unit.id}
                    >
                        <LessonSubjects
                            unit={unit}
                            setSelectedInsertKey={setSelectedInsertKey}
                            selectedInsertKey={selectedInsertKey}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default memo(Units);
