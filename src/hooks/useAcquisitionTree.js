// Kazanım Ağacı
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassStages } from '../store/slice/classStageSlice';
import { getLessons } from '../store/slice/lessonsSlice';
import { getLessonSubjects } from '../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../store/slice/lessonSubSubjectsSlice';
import { getUnits } from '../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../utils/utils';

const useAcquisitionTree = (isActive, loadingControl) => {
    const dispatch = useDispatch();
    const { allClassList } = useSelector((state) => state?.classStages);
    const [classroomId, setClassroomId] = useState();
    const [lessonId, setLessonId] = useState();
    const [unitId, setUnitId] = useState();
    const [lessonSubjectId, setLessonSubjectId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const activeFilter = isActive
        ? [
              {
                  field: 'isActive',
                  value: isActive,
                  compareType: 0,
              },
          ]
        : [];

    useEffect(() => {
        dispatch(getAllClassStages(activeFilter));
    }, []);

    useEffect(() => {
        loadingControl && setIsLoading(true);
        setLessonId();
        setUnitId();
        setLessonSubjectId();
        if (!classroomId) return false;
        const getLessonsList = async () => {
            await dispatch(getLessons(getListFilterParams('classroomId', classroomId).concat(activeFilter)));
            loadingControl && setIsLoading(false);
        };
        getLessonsList();
    }, [classroomId]);

    useEffect(() => {
        setUnitId();
        setLessonSubjectId();
        if (!lessonId) return false;
        dispatch(getUnits(getListFilterParams('lessonId', lessonId).concat(activeFilter)));
    }, [lessonId]);

    useEffect(() => {
        setLessonSubjectId();
        if (!unitId) return false;
        dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', unitId).concat(activeFilter)));
    }, [unitId]);

    useEffect(() => {
        if (!lessonSubjectId) return false;
        dispatch(getLessonSubSubjects(getListFilterParams('lessonSubjectId', lessonSubjectId).concat(activeFilter)));
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
        allClassList,
        isLoading,
    };
};

export default useAcquisitionTree;
