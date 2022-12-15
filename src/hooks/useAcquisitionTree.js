import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassStages } from '../store/slice/classStageSlice';
import { getLessons, getLessonSubjects, getLessonSubSubjects, getUnits } from '../store/slice/lessonsSlice';

const useAcquisitionTree = () => {
  const dispatch = useDispatch();
  const { allClassList } = useSelector((state) => state?.classStages);
  const [classroomId, setClassroomId] = useState();
  const [lessonId, setLessonId] = useState();
  const [unitId, setUnitId] = useState();
  const [lessonSubjectId, setLessonSubjectId] = useState();

  useEffect(() => {
    if (!allClassList.length) loadClassrooms();
  }, []);

  useEffect(() => {
    if (!classroomId) return false;
    setLessonId();
    setUnitId();
    setLessonSubjectId();
    loadLessons([
      {
        field: 'classroomId',
        value: classroomId,
        compareType: 0,
      },
    ]);
  }, [classroomId]);

  useEffect(() => {
    if (!lessonId) return false;
    setUnitId();
    setLessonSubjectId();
    loadUnits([
      {
        field: 'lessonId',
        value: lessonId,
        compareType: 0,
      },
    ]);
  }, [lessonId]);

  useEffect(() => {
    if (!unitId) return false;
    setLessonSubjectId();
    loadLessonSubjects([
      {
        field: 'lessonUnitId',
        value: unitId,
        compareType: 0,
      },
    ]);
  }, [unitId]);

  useEffect(() => {
    if (!lessonSubjectId) return false;
    loadLessonSubSubjects([
      {
        field: 'lessonSubjectId',
        value: lessonSubjectId,
        compareType: 0,
      },
    ]);
  }, [lessonSubjectId]);

  const loadClassrooms = useCallback(async () => {
    await dispatch(getAllClassStages());
  }, [dispatch]);

  const loadLessons = useCallback(
    async (data) => {
      dispatch(getLessons(data));
    },
    [dispatch],
  );

  const loadUnits = useCallback(
    async (data) => {
      await dispatch(getUnits(data));
    },
    [dispatch],
  );

  const loadLessonSubjects = useCallback(
    async (data) => {
      await dispatch(getLessonSubjects(data));
    },
    [dispatch],
  );

  const loadLessonSubSubjects = useCallback(
    async (data) => {
      await dispatch(getLessonSubSubjects(data));
    },
    [dispatch],
  );

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
