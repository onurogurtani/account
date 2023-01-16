import { Tree, Card, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEarningChoice } from '../../../store/slice/earningChoiceSlice';
import EarningSearch from './EarningSearch';
import CustomSelect, { Option } from '../../../components/CustomSelect';
import { getByClassromIdLessons } from '../../../store/slice/lessonsSlice';

const EarningsChoice = () => {
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessonsGetByClassroom } = useSelector((state) => state?.lessons);

  const [treeData, setTreeData] = useState(lessonUnits);
  const [copyFilterData, setCopyFilterData] = useState(lessonUnits);
  const [lessonId, setLessonId] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByClassromIdLessons(63));
  }, []);

  const onChange = (event) => {
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
      const z = treeData.filter((item) => item.children.map((x) => x.title).includes(event.target.value));
      z.map((item) => {
        expandedLevel.push(item.key);
        item.children.map((childItem) => {
          expandedLevel.push(childItem.key);
        });
      });
      setTreeData(z);
      setExpandedKeys(expandedLevel);
    }
    if (filterTreeData.length === 0) {
      const n = treeData.filter((item) =>
        item.children.map((x) => x.children.map((y) => y.title).includes(event.target.value)),
      );
      n.map((item) => {
        expandedLevel.push(item.key);
        item.children.map((childItem) => {
          expandedLevel.push(childItem.key);
          setExpandedKeys(expandedLevel);
        });
      });
      setTreeData(n);
    }

    if (event.target.value === '') {
      setTreeData(copyFilterData);
    }
  };

  const onExpand = (expandedKeys, value) => {
    setExpandedKeys(expandedKeys);
  };

  const handleLesson = (value) => {
    const lessonUnits = lessonsGetByClassroom.filter((item) => item.id === value)[0].lessonUnits;

    const modifiedLessonUnits = lessonUnits.map((item) => {
      return {
        title: item.name,
        key: item.id,
        lessonId: item.lessonId,
        children: item.lessonSubjects.map((x) => {
          return {
            title: x.name,
            key: x.id,
            lessonUnitId: x.lessonUnitId,
            children: x.lessonSubSubjects.map((y) => {
              return { title: y.name, key: y.id, lessonSubjectId: y.lessonSubjectId };
            }),
          };
        }),
      };
    });

    setLessonId(value);
    setTreeData(modifiedLessonUnits);
    setCopyFilterData(modifiedLessonUnits);
  };

  const onCheck = (checkedKeysValue, info) => {
    setCheckedKeys(checkedKeysValue);
    const earningChoice = {
      unitId: [],
      subjectId: [],
      subSubjectId: [],
    };

    if (info.halfCheckedKeys.length > 0) {
      treeData.map((item) => {
        if (info.halfCheckedKeys.includes(item.key)) {
          earningChoice.unitId.push(item?.key);
        }
      });
    }
    info.checkedNodes.map((item) => {
      if (item?.lessonId) {
        earningChoice.unitId.push(item?.key);
      }
      if (item?.lessonSubjectId) {
        earningChoice.subSubjectId.push(item?.key);
        if (info.halfCheckedKeys.includes(item?.lessonSubSubjectId)) {
          earningChoice.subjectId.push(item?.key);
        }
      }
      if (item?.lessonUnitId) {
        earningChoice.subjectId.push(item?.key);
      }
    });

    dispatch(setEarningChoice(earningChoice));
  };

  return (
    <Card title="Kazanım Seçme">
      <EarningSearch onSearch={onChange}></EarningSearch>
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
