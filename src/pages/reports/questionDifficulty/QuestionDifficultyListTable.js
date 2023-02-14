import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTable } from '../../../components';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { getByPagedListDifficultyLevelQuestionOfExam } from '../../../store/slice/difficultyLevelQuestionOfExamSlice';
import useQuestionDifficultyListTableColumns from './hooks/useQuestionDifficultyListTableColumns';
import '../../../styles/table.scss';

const QuestionDifficultyListTable = () => {
  const dispatch = useDispatch();
  const columns = useQuestionDifficultyListTableColumns();
  const { difficultyLevelQuestionOfExams, tableProperty, difficultyLevelQuestionOfExamDetailSearch, filterLevel } =
    useSelector((state) => state.difficultyLevelQuestionOfExams);
  const paginationProps = usePaginationProps(tableProperty);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    dispatch(getByPagedListDifficultyLevelQuestionOfExam());
  }, []);

  useEffect(() => {
    if (filterLevel) {
      const getWillBeExpandedParentNodeKeys = (
        data = [], //filtreleme sonrası açılacak satırlar
      ) =>
        data.reduce(function (accumulator, item) {
          if (item.hasOwnProperty(filterLevel)) {
            return accumulator;
          }

          return item.childs
            ? [
                ...accumulator,
                `${item?.classroomId}_${item?.id}_${item?.lessonId}_${item?.unitId}_${item?.subjectId}`, // uniqe key for expand row
                ...getWillBeExpandedParentNodeKeys(item.childs),
              ]
            : accumulator;
        }, []);

      const data = getWillBeExpandedParentNodeKeys(difficultyLevelQuestionOfExams);
      setExpandedRowKeys(data);
    } else {
      setExpandedRowKeys([]);
    }
  }, [filterLevel, difficultyLevelQuestionOfExams]);

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    dispatch(
      getByPagedListDifficultyLevelQuestionOfExam({
        ...difficultyLevelQuestionOfExamDetailSearch,
        pagination: { pageSize: pagination?.pageSize, pageNumber: pagination?.current },
      }),
    );
  };

  return (
    <CustomTable
      dataSource={difficultyLevelQuestionOfExams}
      onChange={onChangeTable}
      className="question-difficulty-table-list"
      columns={columns}
      pagination={paginationProps}
      expandable={{
        childrenColumnName: 'childs',
        expandedRowKeys,
        onExpandedRowsChange: (expandedRows) => {
          setExpandedRowKeys(expandedRows);
        },
      }}
      rowKey={(record) =>
        `${record?.classroomId}_${record?.id}_${record?.lessonId}_${record?.unitId}_${record?.subjectId}`
      }
      scroll={{ x: false }}
    />
  );
};

export default QuestionDifficultyListTable;
