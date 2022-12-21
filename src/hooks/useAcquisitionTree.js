// Kazanım Ağacı
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassStages } from '../store/slice/classStageSlice';
import { getLessons } from '../store/slice/lessonsSlice';
import { getLessonSubjects } from '../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../store/slice/lessonSubSubjectsSlice';
import { getUnits } from '../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../utils/utils';

const useAcquisitionTree = () => {
  const dispatch = useDispatch();
  const { allClassList } = useSelector((state) => state?.classStages);
  const [classroomId, setClassroomId] = useState();
  const [lessonId, setLessonId] = useState();
  const [unitId, setUnitId] = useState();
  const [lessonSubjectId, setLessonSubjectId] = useState();

  useEffect(() => {
    if (!allClassList.length) dispatch(getAllClassStages());
  }, []);

  useEffect(() => {
    if (!classroomId) return false;
    setLessonId();
    setUnitId();
    setLessonSubjectId();
    dispatch(getLessons(getListFilterParams('classroomId', classroomId)));
  }, [classroomId]);

  useEffect(() => {
    if (!lessonId) return false;
    setUnitId();
    setLessonSubjectId();
    dispatch(getUnits(getListFilterParams('lessonId', lessonId)));
  }, [lessonId]);

  useEffect(() => {
    if (!unitId) return false;
    setLessonSubjectId();
    dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', unitId)));
  }, [unitId]);

  useEffect(() => {
    if (!lessonSubjectId) return false;
    dispatch(getLessonSubSubjects(getListFilterParams('lessonSubjectId', lessonSubjectId)));
  }, [lessonSubjectId]);

  return {
    classroomId,
    setClassroomId,
    lessonId,
    setLessonId,
    unitId,
    setUnitId,
    lessonSubjectId,
    setLessonSubjectId,
  };
};

export default useAcquisitionTree;
