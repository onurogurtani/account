import { Collapse, Typography } from 'antd';
import React, { memo, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableInput from '../../../components/EditableInput';
import { getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { addUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
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
    await dispatch(addUnits(entity));
  };
  return (
    <>
      {filteredLessonUnits.length > 0 && <Title level={3}>Üniteler</Title>}
      <EditableInput
        height="40"
        isEdit={lesson.id === selectedInsertKey?.id && selectedInsertKey?.type === 'lesson'}
        setIsEdit={setSelectedInsertKey}
        onEnter={addUnit}
      />
      <Collapse onChange={onChange}>
        {filteredLessonUnits
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((unit) => (
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
