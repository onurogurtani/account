import React from 'react';
import { CustomTable } from '../../../components';
import '../../../styles/table.scss';
import useQuestionDifficultyListTableColumns from './hooks/useQuestionDifficultyListTableColumns';

const QuestionDifficultyListTable = () => {
  const columns = useQuestionDifficultyListTableColumns();

  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      a: 120,
      b: 100,
      c: 150,
      d: 90,
      e: 80,
      children: [
        {
          key: 11,
          name: 'John Brown',
          a: 120,
          b: 100,
          c: 150,
          d: 90,
          e: 80,
        },
        {
          key: 12,
          name: 'John Brown jr.',
          a: 120,
          b: 100,
          c: 150,
          d: 90,
          e: 80,
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              a: 120,
              b: 100,
              c: 150,
              d: 90,
              e: 80,
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          a: 120,
          b: 100,
          c: 150,
          d: 90,
          e: 80,
          children: [
            {
              key: 131,
              name: 'Jim Green',
              a: 120,
              b: 100,
              c: 150,
              d: 90,
              e: 80,
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  a: 120,
                  b: 100,
                  c: 150,
                  d: 90,
                  e: 80,
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  a: 120,
                  b: 100,
                  c: 150,
                  d: 90,
                  e: 80,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <CustomTable
      dataSource={data}
      //   onChange={onChangeTable}
      className="organisation-table-list"
      columns={columns}
      //   onRow={(record, rowIndex) => {
      //     return {
      //       onClick: (event) => showOrganisations(record),
      //     };
      //   }}
      //   pagination={paginationProps}
      expandable={{ expandedRowKeys: [1, 11, 12], rowExpandable: (record) => true }}
      //   rowKey={(record) => `QuestionDifficultyList-${record?.key}`}
      scroll={{ x: false }}
    />
  );
};

export default QuestionDifficultyListTable;
