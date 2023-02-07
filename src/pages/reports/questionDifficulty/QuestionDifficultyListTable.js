import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import { getByPagedListDifficultyLevelQuestionOfExam } from '../../../store/slice/difficultyLevelQuestionOfExamSlice';
import '../../../styles/table.scss';
import useQuestionDifficultyListTableColumns from './hooks/useQuestionDifficultyListTableColumns';

const QuestionDifficultyListTable = () => {
  const dispatch = useDispatch();
  const columns = useQuestionDifficultyListTableColumns();
  const { difficultyLevelQuestionOfExams, tableProperty, difficultyLevelQuestionOfExamDetailSearch } = useSelector(
    (state) => state.difficultyLevelQuestionOfExams,
  );
  useEffect(() => {
    dispatch(getByPagedListDifficultyLevelQuestionOfExam(difficultyLevelQuestionOfExamDetailSearch));
  }, []);
  console.log('1', difficultyLevelQuestionOfExams);
  const valueMap = {};
  function loops(list, parent) {
    return (list || []).map(({ childs, name }) => {
      const node = (valueMap[name] = {
        parent,
        name,
      });
      node.children = loops(childs, node);
      return node;
    });
  }

  loops(difficultyLevelQuestionOfExams);
  console.log('2', valueMap);

  let key = 1;
  const newObject = structuredClone(difficultyLevelQuestionOfExams);
  newObject.forEach((item) => {
    item.key = key++;
    recurse(item.childs);
  });

  function recurse(obj = []) {
    if (obj.length === 0) {
      return false;
    }
    obj.forEach((child) => {
      child.key = key++;
      recurse(child.childs);
    });
  }
  console.log(newObject);
  return (
    <CustomTable
      dataSource={newObject}
      //   onChange={onChangeTable}
      className="organisation-table-list"
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => console.log(record.key),
        };
      }}
      //   pagination={paginationProps}
      // expandable={{ expandedRowKeys: [1, 11, 12], rowExpandable: (record) => true }}
      expandable={{ childrenColumnName: 'childs' }}
      rowKey={(record) => record?.key}
      scroll={{ x: false }}
    />
  );
};

export default QuestionDifficultyListTable;
