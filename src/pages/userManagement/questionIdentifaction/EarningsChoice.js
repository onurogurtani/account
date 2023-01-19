import { Tree, Card, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEarningChoice, setExpandedEarningChoice } from '../../../store/slice/earningChoiceSlice';
import EarningSearch from './EarningSearch';
import CustomSelect, { Option } from '../../../components/CustomSelect';
import { getByClassromIdLessons } from '../../../store/slice/lessonsSlice';

const EarningsChoice = ({ classroomId = 63 }) => {
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonsGetByClassroom } = useSelector((state) => state?.lessons);
  const { earningChoice } = useSelector((state) => state.earningChoice);

  const [treeData, setTreeData] = useState(lessonUnits);
  const [copyFilterData, setCopyFilterData] = useState(lessonUnits);
  const [lessonId, setLessonId] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [chackedChange, setChackedChange] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByClassromIdLessons(classroomId));
  }, [dispatch, classroomId]);

  const onSearch = (event) => {
    const expandedLevel = [];
    const filterTreeData = treeData.filter((item) => item.title.includes(event.target.value));

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
        element.children.some((subElement) => subElement.title.includes(event.target.value)),
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
        let filteredSubArray = treeData.filter((element) =>
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
    dispatch(setExpandedEarningChoice(expandedKeys));
  };

  const handleLesson = (value) => {
    const lessonUnits = lessonsGetByClassroom.filter((item) => item.id === value)[0].lessonUnits;

    const modifiedLessonUnits = lessonUnits.map((item) => {
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
    });

    setLessonId(value);
    setTreeData(modifiedLessonUnits);
    setCopyFilterData(modifiedLessonUnits);
  };

  useEffect(() => {
    if (!chackedChange) {
      let newData = [];
      earningChoice?.unitId?.forEach((element) => {
        newData.push(element);
      });
      earningChoice?.subjectId?.forEach((element) => {
        newData.push(element);
      });
      earningChoice?.subSubjectId?.forEach((element) => {
        newData.push(element);
      });
      setCheckedKeys(newData);
    }
  }, [chackedChange, earningChoice]);
  const onCheck = (checkedKeysValue, info) => {
    setCheckedKeys(checkedKeysValue);
    setChackedChange(true);
    const earningChoice = {
      unitId: [],
      subjectId: [],
      subSubjectId: [],
    };

    if (info.halfCheckedKeys.length > 0) {
      treeData.map((item) => {
        info.halfCheckedKeys.map((subItem) => {
          const difIndex = subItem.search('/');
          if (subItem.slice(0, difIndex).includes(item.id.toString())) {
            earningChoice.unitId.push(item?.id);
          }
        
        });
      });
      info.halfCheckedKeys.map((item) => {
        const difIndex = item.search('/');
        if (!earningChoice.unitId.includes(parseInt(item.slice(0, difIndex)))) {
          earningChoice.subjectId.push(parseInt(item.slice(0, difIndex)));
        }
      });
    }
  
    info.checkedNodes.map((item) => {
      if (item?.lessonId) {
        earningChoice.unitId.push(item?.id);
      }
      if (item?.lessonSubjectId) {
        earningChoice.subSubjectId.push(item?.id);
        if (info.halfCheckedKeys.includes(item?.lessonSubSubjectId)) {
          earningChoice.subjectId.push(item?.id);
        }
      }
      if (item?.lessonUnitId) {
        earningChoice.subjectId.push(item?.id);
      }
    });

    dispatch(setEarningChoice(earningChoice));
  };

  return (
    <Card title="Kazanım Seçme">
      <EarningSearch onSearch={onSearch}></EarningSearch>
      <br></br>
      <CustomSelect
        value={lessonId}
        onChange={handleLesson}
        height={'14px'}
        style={{ float: 'right', width: '200px' }}
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
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        checkable
        treeData={treeData}
      />
      {treeData.length === 0 && (
        <Result status="warning" title="Kazanım Ağacı Görüntülemek İçin Ders Seçimi Yapmanız Gerekmektedir" />
      )}
    </Card>
  );
};
export default EarningsChoice;
