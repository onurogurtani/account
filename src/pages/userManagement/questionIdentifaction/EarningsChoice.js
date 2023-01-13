import { Tree, Card, Result } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEarningChoice } from '../../../store/slice/earningChoiceSlice';
import { getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import EarningSearch from './EarningSearch';
import CustomSelect, { Option } from '../../../components/CustomSelect';
import { getLessons } from '../../../store/slice/lessonsSlice';

const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.id === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
const EarningsChoice = () => {
  const { lessonUnits } = useSelector((state) => state?.lessonUnits);
  const { lessons } = useSelector((state) => state?.lessons);

  const [treeData, setTreeData] = useState(lessonUnits);
  const [lessonId, setLessonId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLessons(getListFilterParams('classroomId', 63)));
  }, []);

  useEffect(() => {
    setTreeData(lessonUnits.filter((item) => item.lessonId === lessonId));
  }, [lessonUnits]);

  const onSearch = (event) => {
    const filterTreeData = treeData.filter((item) => item.name.includes(event.target.value));
    setTreeData(filterTreeData);
    if (event.target.value === '') {
      setTreeData(lessonUnits);
    }
  };

  const handleLesson = (value) => {
    setLessonId(value);
    dispatch(getUnits(getListFilterParams('lessonId', value)));
  };

  const onCheck = (checkedKeysValue, info) => {
    const earningChoice = {
      unitId: [],
      subjectId: [],
      subSubjectId: [],
    };

    if (info.halfCheckedKeys.length > 0) {
      lessonUnits.map((item) => {
        if (info.halfCheckedKeys.includes(item.id)) {
          earningChoice.unitId.push(item?.id);
        }
      });
    }

    info.checkedNodes.map((item) => {
      if (item?.lessonId) {
        earningChoice.unitId.push(item?.id);
      }
      if (item?.lessonSubjectId) {
        earningChoice.subSubjectId.push(item?.id);
        if (info.halfCheckedKeys.includes(item?.lessonSubjectId)) {
          earningChoice.subjectId.push(item?.lessonSubjectId);
        }
      }
      if (item?.lessonUnitId) {
        earningChoice.subjectId.push(item?.id);
      }
    });
    dispatch(setEarningChoice(earningChoice));
  };

  const onLoadData = async ({ key, children, ...node }) => {
    if (children) {
      return;
    }
    try {
      if (node.lessonId) {
        const action = await dispatch(getLessonSubjects(getListFilterParams('lessonUnitId', Number(key)))).unwrap();
        setTreeData((origin) => updateTreeData(origin, key, action?.data?.items));
      }
      if (node.lessonUnitId) {
        const action = await dispatch(
          getLessonSubSubjects(getListFilterParams('lessonSubjectId', Number(key))),
        ).unwrap();
        setTreeData((origin) => updateTreeData(origin, key, action?.data?.items));
      }
    } catch (error) {}
  };

  return (
    <Card title="Kazanım Seçme">
      <EarningSearch onSearch={onSearch}></EarningSearch>
      <br></br>
      <CustomSelect
        onChange={handleLesson}
        height={'14px'}
        style={{ float: 'right', width: '200px' }}
        placeholder="Ders Seçiniz"
      >
        {lessons.map((item) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
      </CustomSelect>
      <br></br>
      <Tree
        onCheck={onCheck}
        checkable
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        loadData={onLoadData}
        treeData={treeData}
        autoExpandParent
      />
      {treeData.length === 0 && (
        <Result status="warning" title="Kazanım Ağacı Görüntülemek İçin Ders Seçimi Yapmanız Gerekmektedir" />
      )}
    </Card>
  );
};
export default EarningsChoice;
