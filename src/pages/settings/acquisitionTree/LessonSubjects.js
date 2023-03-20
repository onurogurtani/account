import { Collapse, Typography } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getListFilterParams } from '../../../utils/utils';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import LessonSubject from './LessonSubject';
import LessonSubSubjects from './LessonSubSubjects';

const { Panel } = Collapse;
const { Title } = Typography;
const LessonSubjects = ({ unit, selectedInsertKey, setSelectedInsertKey }) => {
    const dispatch = useDispatch();
    const { lessonSubjects } = useSelector((state) => state?.lessonSubjects);
    const [openedPanels, setOpenedPanels] = useState([]);

    const filteredLessonSubjects = useMemo(
        () => lessonSubjects?.filter((item) => item.lessonUnitId === unit.id),
        [lessonSubjects, unit.id],
    );

    const onChange = (key) => {
        setOpenedPanels(key);
        if (!key.toString()) return false;
        if (openedPanels.includes(key.at(-1)?.toString())) return false;
        dispatch(getLessonSubSubjects(getListFilterParams('lessonSubjectId', Number(key.toString()))));
    };
    const addSubject = async (value) => {
        const entity = {
            entity: {
                name: value,
                isActive: true,
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
                            />
                        }
                        key={lessonSubject.id}
                    >
                        <LessonSubSubjects
                            lessonSubject={lessonSubject}
                            setSelectedInsertKey={setSelectedInsertKey}
                            selectedInsertKey={selectedInsertKey}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default memo(LessonSubjects);
