import { Tree, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonSubjects } from '../../../store/slice/lessonSubjectsSlice';
import { getLessonSubSubjects } from '../../../store/slice/lessonSubSubjectsSlice';
import { getUnits } from '../../../store/slice/lessonUnitsSlice';
import { getListFilterParams } from '../../../utils/utils';
import EarningSearch from './EarningSearch';

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

  const [treeData, setTreeData] = useState(lessonUnits);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnits(getListFilterParams('lessonId', 58)));
  }, []);

  useEffect(() => {
    setTreeData(lessonUnits);
  }, [lessonUnits]);

  const onCheck = (checkedKeysValue, info) => {
    const earningChoice = {
      unitId: 67,
      subjectId: [],
      subSubjectId: [],
    };
    info.checkedNodes.map((item) => {
      if (item.lessonSubjectId) {
        earningChoice.subSubjectId.push(item?.id);
      }
      if (item.lessonUnitId) {
        earningChoice.subjectId.push(item?.id);
      }
    });
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
      <EarningSearch></EarningSearch>
      <br></br>
      <Tree
        onCheck={onCheck}
        checkable
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        loadData={onLoadData}
        treeData={treeData}
        autoExpandParent
      />
    </Card>
  );
};
export default EarningsChoice;
