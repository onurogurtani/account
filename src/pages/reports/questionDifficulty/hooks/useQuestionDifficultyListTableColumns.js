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
          dataIndex: 'a',
          key: 'a',
          width: '5%',
        },
        {
          title: '2',
          dataIndex: 'b',
          key: 'b',
          width: '5%',
        },
        {
          title: '3',
          dataIndex: 'c',
          key: 'c',
          width: '5%',
        },
        {
          title: '4',
          dataIndex: 'd',
          key: 'd',
          width: '5%',
        },
        {
          title: '5',
          dataIndex: 'e',
          key: 'e',
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
            onClick={() => console.log(index)}
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
