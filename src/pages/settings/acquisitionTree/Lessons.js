import { Collapse, Typography } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import Lesson from './Lesson';
import Units from './Units';

const { Title } = Typography;
const { Panel } = Collapse;
const Lessons = ({ classroomId }) => {
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

  return (
    <>
      {filteredLessons.length > 0 && <Title level={3}>Dersler</Title>}
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
