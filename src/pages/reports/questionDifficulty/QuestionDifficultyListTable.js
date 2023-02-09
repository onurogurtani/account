import React, { useEffect, useState } from 'react';
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
  const [expandedRowKeys, setExpandedRowKeys] = useState([208]);
  // console.log('1', difficultyLevelQuestionOfExams);
  // const valueMap = {};
  // function loops(list, parent) {
  //   return (list || []).map(({ childs, name }) => {
  //     const node = (valueMap[name] = {
  //       parent,
  //       name,
  //     });
  //     node.children = loops(childs, node);
  //     return node;
  //   });
  // }

  // loops(difficultyLevelQuestionOfExams);
  // console.log('2', valueMap);

  // let key = 1;
  // let level = 1;
  // const newObject = structuredClone(difficultyLevelQuestionOfExams);
  // newObject.forEach((item) => {
  //   item.key = key++;
  //   level = 1;
  //   recurse(item.childs, [item.id]);
  // });

  // function recurse(obj = [], id = []) {
  //   if (obj.length === 0) {
  //     return false;
  //   }
  //   obj.forEach((child) => {
  //     child.key = key++;
  //     child.level = level < 4 ? level++ : level;
  //     child.parentIds = id.concat([child.id]);
  //     recurse(child.childs, child?.parentIds);
  //   });
  // }
  // console.log(newObject);
  return (
    <CustomTable
      dataSource={difficultyLevelQuestionOfExams}
      //   onChange={onChangeTable}
      className="organisation-table-list"
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => () => console.log(event),
        };
      }}
      //   pagination={paginationProps}
      // expandable={{ expandedRowKeys: [1, 11, 12], rowExpandable: (record) => true }}
      expandable={{
        childrenColumnName: 'childs',
        expandedRowKeys,
        onExpandedRowsChange: (expandedRows) => {
          console.log(expandedRows);
          setExpandedRowKeys(expandedRows);
        },
      }}
      rowKey={(record) => record?.id}
      scroll={{ x: false }}
    />
  );
};

export default QuestionDifficultyListTable;
