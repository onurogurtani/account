import { Tree, Card, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEarningChoice } from '../../../store/slice/earningChoiceSlice';
import EarningSearch from './EarningSearch';
import CustomSelect, { Option } from '../../../components/CustomSelect';
import { getByClassromIdLessons } from '../../../store/slice/lessonsSlice';

const EarningsChoice = ({ classroomId, updateStatus }) => {
    const { lessonUnits } = useSelector((state) => state?.lessonUnits);
    const { lessonsGetByClassroom } = useSelector((state) => state?.lessons);
    const { earningChoice, lessonIds } = useSelector((state) => state.earningChoice);

    const [treeData, setTreeData] = useState(lessonUnits);
    const [copyFilterData, setCopyFilterData] = useState(lessonUnits);
    const [lessonId, setLessonId] = useState([]);
    const [selectedLessons, setSelectedLesson] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [chackedChange, setChackedChange] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setTreeData(loadTreeData());
        setCopyFilterData(loadTreeData());
        setLessonId(lessonIds);
    }, [lessonsGetByClassroom, lessonIds]);

    useEffect(() => {
        dispatch(getByClassromIdLessons(classroomId));
    }, [dispatch, classroomId]);

    const loadTreeData = () => {
        const selectLessons = lessonsGetByClassroom.filter((item) => lessonId.includes(item.id));

        setSelectedLesson(selectLessons);

        const lessonUnits = [];

        selectLessons.map((item) => lessonUnits.push(item.lessonUnits));

        function flatten(arr) {
            var flat = [];
            for (var i = 0; i < arr.length; i++) {
                flat = flat.concat(arr[i]);
            }
            return flat;
        }

        const modifiedLessonUnits = selectLessons.map((item) => {
            return {
                title: item.name,
                key: item.id.toString() + '/lesson',
                id: item?.id,
                children: flatten(lessonUnits)
                    .filter((u) => u.lessonId === item.id)
                    .map((item) => {
                        return {
                            title: item.name,
                            key: item.id.toString() + '/unit',
                            id: item?.id,
                            lessonId: item.lessonId,
                            children: item.lessonSubjects.map((x) => {
                                return {
                                    title: x.name,
                                    key: x.id.toString() + '/lessonSubject',
                                    id: x.id,
                                    lessonUnitId: x.lessonUnitId,
                                    children: x.lessonSubSubjects.map((y) => {
                                        return {
                                            title: y.name,
                                            key: y.id.toString() + '/lessonSubSubject',
                                            id: y.id,
                                            lessonSubjectId: y.lessonSubjectId,
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
            };
        });

        return modifiedLessonUnits;
    };

    const onSearch = (event) => {
        const expandedLevel = [];
        const filterTreeData = treeData.filter((item) =>
            item.title.toLowerCase().includes(event.target.value.toLowerCase()),
        );

        setTreeData(filterTreeData);

        if (filterTreeData.length > 0) {
            filterTreeData.map((item) => {
                expandedLevel.push(item.key);
                item.children.map((childItem) => {
                    expandedLevel.push(childItem.key);
                });
            });
            setTreeData(filterTreeData);
            setExpandedKeys(expandedLevel);
        }

        if (filterTreeData.length === 0) {
            let filteredArray = treeData.filter((element) =>
                element.children.some((subElement) =>
                    subElement.title.toLowerCase().includes(event.target.value.toLowerCase()),
                ),
            );

            filteredArray.map((item) => {
                expandedLevel.push(item.key);
                item.children.map((childItem) => {
                    expandedLevel.push(childItem.key);
                });
            });
            setTreeData(filteredArray);
            setExpandedKeys(expandedLevel);

            if (filteredArray.length === 0) {
                let filteredSubArray = copyFilterData.filter((element) =>
                    element.children.some((subElement) =>
                        subElement.children.some((subElementt) => subElementt.title.includes(event.target.value)),
                    ),
                );

                filteredSubArray.map((item) => {
                    expandedLevel.push(item.key);
                    item.children.map((childItem) => {
                        expandedLevel.push(childItem.key);
                        setExpandedKeys(expandedLevel);
                    });
                });

                setTreeData(filteredSubArray);
            }
        }
        if (event.target.value === '') {
            setTreeData(copyFilterData);
        }
    };

    const onExpand = (expandedKeys, value) => {
        setExpandedKeys(expandedKeys);
    };

    const handleLesson = (value) => {
        const selectLessons = lessonsGetByClassroom.filter((item) => value.includes(item.id));

        const lessonUnits = [];

        selectLessons.map((item) => lessonUnits.push(item.lessonUnits));

        function flatten(arr) {
            var flat = [];
            for (var i = 0; i < arr.length; i++) {
                flat = flat.concat(arr[i]);
            }
            return flat;
        }

        const modifiedLessonUnits = selectLessons.map((item) => {
            return {
                title: item.name,
                key: item.id.toString() + '/lesson',
                id: item?.id,
                children: flatten(lessonUnits)
                    .filter((u) => u.lessonId === item.id)
                    .map((item) => {
                        return {
                            title: item.name,
                            key: item.id.toString() + '/unit',
                            id: item?.id,
                            lessonId: item.lessonId,
                            children: item.lessonSubjects.map((x) => {
                                return {
                                    title: x.name,
                                    key: x.id.toString() + '/lessonSubject',
                                    id: x.id,
                                    lessonUnitId: x.lessonUnitId,
                                    children: x.lessonSubSubjects.map((y) => {
                                        return {
                                            title: y.name,
                                            key: y.id.toString() + '/lessonSubSubject',
                                            id: y.id,
                                            lessonSubjectId: y.lessonSubjectId,
                                        };
                                    }),
                                };
                            }),
                        };
                    }),
            };
        });

        const editSelectedLessons = lessonsGetByClassroom.filter((item) => value.includes(item.id));

        setLessonId(value);
        setTreeData(modifiedLessonUnits);
        setCopyFilterData(modifiedLessonUnits);
        setSelectedLesson(editSelectedLessons);
    };

    useEffect(() => {
        if (!chackedChange) {
            let newData = [];
            const checkedData = earningChoice?.subSubjectId?.map((item) => item.toString() + '/lessonSubSubject');

            if (updateStatus) {
                setCheckedKeys(checkedData);
            } else {
                setCheckedKeys([]);
            }
            earningChoice?.subjectId?.forEach((element) => {
                newData.push(element.toString() + '/lessonSubject');
            });
            earningChoice?.unitId?.forEach((element) => {
                newData.push(element.toString() + '/unit');
            });
            lessonId.map((item) => {
                newData.push(item.toString() + '/lesson');
            });
            setTimeout(() => {
                setExpandedKeys(newData);
            }, '1000');
        }
    }, [chackedChange, earningChoice, updateStatus, lessonId]);

    const onCheck = (checkedKeysValue, info) => {
        const emptyEarningChoice = {
            unitId: [],
            subjectId: [],
            subSubjectId: [],
        };

        checkedKeysValue.map((item) => {
            if (item.includes('lessonSubSubject')) {
                emptyEarningChoice.subSubjectId.push(parseInt(item.split('/')[0]));
            }
            if (item.includes('lessonSubject')) {
                emptyEarningChoice.subjectId.push(parseInt(item.split('/')[0]));
            }
            if (item.includes('unit')) {
                emptyEarningChoice.unitId.push(parseInt(item.split('/')[0]));
            }
        });

        info.halfCheckedKeys.map((item) => {
            if (item.includes('lessonSubject')) {
                emptyEarningChoice.subjectId.push(parseInt(item.split('/')[0]));
            }
            if (item.includes('unit')) {
                emptyEarningChoice.unitId.push(parseInt(item.split('/')[0]));
            }
        });

        dispatch(setEarningChoice(emptyEarningChoice));
        setCheckedKeys(checkedKeysValue);
        setExpandedKeys(checkedKeysValue);
        setChackedChange(true);
    };

    return (
        <Card title="Kazanım Seçme">
            <EarningSearch onSearch={onSearch}></EarningSearch>
            <br></br>
            <CustomSelect
                value={lessonId}
                mode="multiple"
                onChange={handleLesson}
                height={'8px'}
                style={{ float: 'right', width: '500px' }}
                placeholder="Ders Seçiniz"
            >
                {lessonsGetByClassroom.map((item) => {
                    return (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    );
                })}
            </CustomSelect>
            <br></br>
            <br></br>
            <br></br>
            <Tree
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                checkable
                treeData={treeData}
                height={233}
            />

            {lessonIds.length === 0 && treeData.length === 0 && (
                <Result status="warning" title="Kazanım Ağacı Görüntülemek İçin Ders Seçimi Yapmanız Gerekmektedir" />
            )}
        </Card>
    );
};
export default EarningsChoice;
