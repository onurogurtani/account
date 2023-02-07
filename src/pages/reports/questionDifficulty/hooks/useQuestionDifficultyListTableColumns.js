import React from 'react';
import { CustomButton } from '../../../../components';

const useQuestionDifficultyListTableColumns = () => {
  const columns = [
    {
      title: 'Sınıf Seviyesi',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Zorluk Seviyesine Göre Soru Sayıları',
      children: [
        {
          title: '1',
          dataIndex: 'difficulty1QuestionOfExamCount',
          key: 'difficulty1QuestionOfExamCount',
          width: '5%',
        },
        {
          title: '2',
          dataIndex: 'difficulty2QuestionOfExamCount',
          key: 'difficulty2QuestionOfExamCount',
          width: '5%',
        },
        {
          title: '3',
          dataIndex: 'difficulty3QuestionOfExamCount',
          key: 'difficulty3QuestionOfExamCount',
          width: '5%',
        },
        {
          title: '4',
          dataIndex: 'difficulty4QuestionOfExamCount',
          key: 'difficulty4QuestionOfExamCount',
          width: '5%',
        },
        {
          title: '5',
          dataIndex: 'difficulty5QuestionOfExamCount',
          key: 'difficulty5QuestionOfExamCount',
          width: '5%',
        },
      ],
    },
    {
      width: '10%',
      render: (text, record, index) => {
        return (
          <CustomButton
            type="danger"
            height="20px"
            style={{ backgroundColor: 'slateblue', border: 'none' }}
            onClick={() => console.log(record)}
          >
            Detay Gör
          </CustomButton>
        );
      },
    },
  ];
  return columns;
};

export default useQuestionDifficultyListTableColumns;
