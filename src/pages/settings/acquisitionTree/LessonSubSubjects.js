import { Typography } from 'antd';
import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditableInput from '../../../components/EditableInput';
import { addLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import LessonSubSubject from './LessonSubSubject';

const { Title } = Typography;
const LessonSubSubjects = ({ lessonSubject, selectedInsertKey, setSelectedInsertKey }) => {
  const dispatch = useDispatch();
  const { lessonSubSubjects } = useSelector((state) => state?.lessonSubSubjects);

  const filteredLessonSubSubjects = useMemo(
    () => lessonSubSubjects?.filter((item) => item.lessonSubjectId === lessonSubject.id),
    [lessonSubSubjects, lessonSubject.id],
  );

  const addLessonSubSubject = async (value) => {
    const entity = {
      entity: {
        name: value,
        isActive: true,
        lessonSubjectId: lessonSubject.id,
      },
    };
    await dispatch(addLessonSubSubjects(entity));
  };
  return (
    <>
      {filteredLessonSubSubjects.length > 0 && <Title level={3}>Alt Başlıklar</Title>}
      <EditableInput
        height="40"
        isEdit={lessonSubject.id === selectedInsertKey?.id && selectedInsertKey?.type === 'lessonSubject'}
        setIsEdit={setSelectedInsertKey}
        onEnter={addLessonSubSubject}
      />
      {filteredLessonSubSubjects
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((lessonSubSubject) => (
          <div className="mb-3">
            <LessonSubSubject setSelectedInsertKey={setSelectedInsertKey} lessonSubSubject={lessonSubSubject} />
          </div>
        ))}
    </>
  );
};

export default memo(LessonSubSubjects);
