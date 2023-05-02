// Kazanım Ağacı
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClassStages } from '../store/slice/classStageSlice';
import { getLessons } from '../store/slice/lessonsSlice';
import { getLessonSubjects } from '../store/slice/lessonSubjectsSlice';
import { getLessonAcquisitions } from '../store/slice/lessonAcquisitionsSlice';
import { getUnits } from '../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../utils/utils';
import { getLessonBrackets } from '../store/slice/lessonBracketsSlice';

const useAcquisitionTree = (isActive, loadingControl, educationYear) => {
    const dispatch = useDispatch();
    const { allClassList } = useSelector((state) => state?.classStages);
    const [educationYearId, setEducationYearId] = useState();
    const [classroomId, setClassroomId] = useState();
    const [lessonId, setLessonId] = useState();
    const [unitId, setUnitId] = useState();
    const [lessonSubjectId, setLessonSubjectId] = useState();
    const [acquisitionId, setAcquisitionId] = useState()
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
        !educationYear && dispatch(getAllClassStages(activeFilter));
    }, []);

    useEffect(() => {
        setClassroomId()
        setLessonId();
        setUnitId();
        setLessonSubjectId();
        setAcquisitionId()
        if (!educationYearId) return false;
        const getEducationYearList = async () => {
            await dispatch(getAllClassStages(getListFilterParams('educationYearId', educationYearId).concat(activeFilter)));
        };
        getEducationYearList();
    }, [educationYearId]);

    useEffect(() => {
        loadingControl && setIsLoading(true);
        setLessonId();
        setUnitId();
        setLessonSubjectId();
        setAcquisitionId()
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
        setAcquisitionId()
        if (!lessonId) return false;
        dispatch(getUnits(getListFilterParams('lessonId', lessonId).concat(activeFilter)));
    }, [lessonId]);

    useEffect(() => {
        setLessonSubjectId();
        setAcquisitionId()
        if (!unitId) return false;
        dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', unitId).concat(activeFilter)));
    }, [unitId]);

    useEffect(() => {
        setAcquisitionId()
        if (!lessonSubjectId) return false;
        dispatch(getLessonAcquisitions(getListFilterParams('lessonSubjectId', lessonSubjectId).concat(activeFilter)));
    }, [lessonSubjectId]);

    useEffect(() => {
        if (!acquisitionId) return false;
        dispatch(getLessonBrackets(getListFilterParams('lessonAcquisitionId', acquisitionId).concat(activeFilter)));
    }, [acquisitionId]);

    return {
        educationYearId,
        setEducationYearId,
        classroomId,
        setClassroomId,
        lessonId,
        setLessonId,
        unitId,
        setUnitId,
        lessonSubjectId,
        setLessonSubjectId,
        acquisitionId,
        setAcquisitionId,
        allClassList,
        isLoading,
    };
};

export default useAcquisitionTree;
