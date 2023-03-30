import { Collapse, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLessonAcquisitions } from '../../../store/slice/lessonAcquisitionsSlice';
import { getLessonBrackets } from '../../../store/slice/lessonBracketsSlice';
import { getListFilterParams } from '../../../utils/utils';
import AcquisitionTreeCreateOrEdit from './AcquisitionTreeCreateOrEdit';
import LessonAcquisition from './LessonAcquisition';
import LessonBrackets from './LessonBrackets';

const { Panel } = Collapse;
const { Title } = Typography;

const LessonAcquisitions = ({ lessonSubject, selectedInsertKey, setSelectedInsertKey, parentIsActive }) => {
    const dispatch = useDispatch();
    const { lessonAcquisitions } = useSelector((state) => state?.lessonAcquisitions);
    const [openedPanels, setOpenedPanels] = useState([]);

    const filteredLessonAcquisitions = useMemo(
        () => lessonAcquisitions?.filter((item) => item.lessonSubjectId === lessonSubject.id),
        [lessonAcquisitions, lessonSubject.id],
    );
    const onChange = (key) => {
        setOpenedPanels(key);
        if (!key.toString()) return false;
        if (openedPanels.includes(key.at(-1)?.toString())) return false;
        dispatch(getLessonBrackets(getListFilterParams('lessonAcquisitionId', Number(key.at(-1).toString()))));
    };

    const addLessonAcquisition = async (value) => {
        const entity = {
            entity: {
                name: value.name,
                isActive: true,
                lessonSubjectId: lessonSubject.id,
                code: value.code,
            },
        };
        await dispatch(addLessonAcquisitions(entity)).unwrap();
    };

    return (
        <>
            {filteredLessonAcquisitions.length > 0 && <Title level={3}>Kazanımlar - Kazanım Kodları</Title>}
            <AcquisitionTreeCreateOrEdit
                height="40"
                isEdit={lessonSubject.id === selectedInsertKey?.id && selectedInsertKey?.type === 'lessonSubject'}
                setIsEdit={setSelectedInsertKey}
                onEnter={addLessonAcquisition}
                code
            />
            <Collapse destroyInactivePanel={true} onChange={onChange}>
                {filteredLessonAcquisitions.map((lessonAcquisition) => (
                    <Panel
                        header={
                            <LessonAcquisition
                                setSelectedInsertKey={setSelectedInsertKey}
                                lessonAcquisition={lessonAcquisition}
                                open={openedPanels.includes(lessonAcquisition.id.toString())}
                                parentIsActive={parentIsActive}
                            />
                        }
                        key={lessonAcquisition.id}
                    >
                        <LessonBrackets
                            lessonAcquisition={lessonAcquisition}
                            setSelectedInsertKey={setSelectedInsertKey}
                            selectedInsertKey={selectedInsertKey}
                            parentIsActive={parentIsActive ? lessonAcquisition.isActive : false}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default LessonAcquisitions;
