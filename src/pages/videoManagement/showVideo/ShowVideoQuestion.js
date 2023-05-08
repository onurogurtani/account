import { CheckCircleOutlined, ClockCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { sanitize } from 'dompurify';
import React from 'react';
import { useSelector } from 'react-redux';

const ShowVideoQuestion = () => {
  const { currentVideo } = useSelector((state) => state?.videos);

  const renderList = (item) => {
    return <>
      <ClockCircleOutlined />
      <div className='bracketTime'>{item?.lessonBracket?.bracketTime}</div>
      <div className='bracketHeader'>{item?.lessonBracket?.code} - {item?.lessonBracket?.name} </div>
      <QuestionCircleOutlined />
      <div className='question' dangerouslySetInnerHTML={{ __html: sanitize(item?.text) }} />
      <CheckCircleOutlined className='answerIcon' />
      <div className="answer" dangerouslySetInnerHTML={{ __html: sanitize(item?.answer) }} />
    </>
  }

  return (
    <div className="question-list">
      <List
        itemLayout="horizontal"
        dataSource={currentVideo?.videoQuestions}
        renderItem={(item, index) => (
          <List.Item>
            {renderList(item)}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ShowVideoQuestion;
