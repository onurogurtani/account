import { Collapse, Typography } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableInput from '../../../components/EditableInput';
import { addLessons } from '../../../store/slice/lessonsSlice';
import { getUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import Lesson from './Lesson';
import Units from './Units';

const { Title } = Typography;
const { Panel } = Collapse;
const Lessons = ({ classroomId, isAdd, setIsAdd }) => {
    const dispatch = useDispatch();
    const { lessons } = useSelector((state) => state?.lessons);
    const [openedPanels, setOpenedPanels] = useState([]);
    const [selectedInsertKey, setSelectedInsertKey] = useState();
    const filteredLessons = useMemo(
        () => lessons?.filter((item) => item.classroomId === classroomId),
        [lessons, classroomId],
    );

    const onChange = (key) => {
        setOpenedPanels(key);
        if (!key.toString()) return false;
        dispatch(getUnits(getListFilterParams('lessonId', Number(key.at(-1).toString()))));
    };

    const addLesson = useCallback(
        async (value) => {
            const entity = {
                entity: {
                    name: value,
                    isActive: true,
                    classroomId,
                },
            };
            await dispatch(addLessons(entity));
        },
        [classroomId, dispatch],
    );

    return (
        <>
            {filteredLessons.length === 0 && (
                <Title level={5} type="danger" style={{ textAlign: 'center' }}>
                    Bu sınıf seviyesine tanımlı bir kazanım ağacı bulunmamaktadır. Eklemek için ders ekle veya excel ile
                    ekle seçeneğini kullanın.
                </Title>
            )}
            <br />
            {(isAdd || filteredLessons.length !== 0) && <Title level={3}>Dersler</Title>}
            <EditableInput height="40" isEdit={isAdd} setIsEdit={setIsAdd} onEnter={addLesson} />
            <Collapse onChange={onChange}>
                {filteredLessons
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((lesson) => (
                        <Panel
                            header={
                                <Lesson
                                    setSelectedInsertKey={setSelectedInsertKey}
                                    lesson={lesson}
                                    open={openedPanels.includes(lesson.id.toString())}
                                />
                            }
                            key={lesson.id}
                        >
                            <Units
                                lesson={lesson}
                                setSelectedInsertKey={setSelectedInsertKey}
                                selectedInsertKey={selectedInsertKey}
                            />
                        </Panel>
                    ))}
            </Collapse>
        </>
    );
};

export default memo(Lessons);
