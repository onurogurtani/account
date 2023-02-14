import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../../../../components';

const useQuestionDifficultyListTableColumns = () => {
  const history = useHistory();
  const { difficultyLevelQuestionOfExams, filterLevel } = useSelector((state) => state.difficultyLevelQuestionOfExams);

  const sendDetail = (record) => {
    const data = difficultyLevelQuestionOfExams.find((i) => i.id === record.classroomId);
    const arr = ['subSubjectId', 'subjectId', 'unitId', 'lessonId'];
    let key;
    let i = 0;
    while (i < arr.length) {
      if (record.hasOwnProperty(arr[i])) {
        key = arr[i];
        break;
      }
      i = i + 1;
    }
    console.log(key);
    // let abc = [];
    // function traverse(obj) {
    //   abc.push(obj?.name);
    //   if (obj.childs && !obj.childs[0].hasOwnProperty(key)) {
    //     traverse(obj.childs[0]);
    //   }
    // }
    // traverse(data);
    function find({ childs = [], ...object }, key) {
      var result;
      if (object.key === key) return object;
      return childs.some((o) => (result = find(o, key))) && Object.assign({}, object, { childs: [result] });
    }

    const newObject = structuredClone(data);
    const newObject2 = [newObject];
    console.log(newObject);
    newObject2.forEach((item) => {
      item.key = item.id;
      recurse(item.childs);
    });

    function recurse(obj = []) {
      if (obj.length === 0) {
        return false;
      }
      obj.forEach((child) => {
        child.key = `${child?.classroomId}_${child?.lessonId}_${child?.unitId}_${child?.subjectId}_${child?.id}`;
        recurse(child.childs);
      });
    }
    console.log(...newObject2);

    console.log(find(...newObject2, '65_205_208_232_232'));

    // history.push({
    //   pathname: `/reports/question-difficulty/detail`,
    //   state: { allData: data, reportData: record, isFiltered: filterLevel ? true : false },
    // });
  };

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
            onClick={() => sendDetail(record)}
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
