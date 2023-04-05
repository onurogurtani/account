import { Collapse, Typography } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { addLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getListFilterParams } from '../../../utils/utils';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import LessonAcquisitions from './LessonAcquisitions';
import LessonSubject from './LessonSubject';

const { Panel } = Collapse;
const { Title } = Typography;
const LessonSubjects = ({ unit, selectedInsertKey, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const [openedPanels, setOpenedPanels] = useState([]);

    const filteredLessonSubjects = useMemo(
        () => lessonSubjects?.filter((item) => item.lessonUnitId === unit.id),
        [lessonSubjects, unit.id],
    );

    const onChange = (key) => {
        console.log(key);
        setOpenedPanels(key);
        if (!key.toString()) return false;
        if (openedPanels.includes(key.at(-1)?.toString())) return false;
        dispatch(getLessonAcquisitions(getListFilterParams('lessonSubjectId', Number(key.at(-1).toString()))));
    };
    const addSubject = async (value) => {
        const entity = {
            entity: {
                name: value.name,
                isActive: parentIsActive,
                lessonUnitId: unit.id,
            },
        };
        await dispatch(addLessonSubjects(entity)).unwrap();
    };
    console.log(1, selectedInsertKey);
    return (
        <>
            {filteredLessonSubjects.length > 0 && <Title level={3}>Konular</Title>}
            <AcquisitionTreeCreateOrEdit
                height="40"
                isEdit={unit.id === selectedInsertKey?.id && selectedInsertKey?.type === 'unit'}
                setIsEdit={setSelectedInsertKey}
                onEnter={addSubject}
            />
            <Collapse destroyInactivePanel={true} onChange={onChange}>
                {filteredLessonSubjects.map((lessonSubject) => (
                    <Panel
                        header={
                            <LessonSubject
                                setSelectedInsertKey={setSelectedInsertKey}
                                lessonSubject={lessonSubject}
                                open={openedPanels.includes(lessonSubject.id.toString())}
                                parentIsActive={parentIsActive}
                            />
                        }
                        key={lessonSubject.id}
                    >
                        <LessonAcquisitions
                            lessonSubject={lessonSubject}
                            setSelectedInsertKey={setSelectedInsertKey}
                            selectedInsertKey={selectedInsertKey}
                            parentIsActive={parentIsActive ? lessonSubject.isActive : false}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default memo(LessonSubjects);
