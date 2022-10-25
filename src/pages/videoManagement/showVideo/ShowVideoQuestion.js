import { CheckCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const ShowVideoQuestion = () => {
  const { currentVideo } = useSelector((state) => state?.videos);

  return (
    <div className="question-list">
      <List
        itemLayout="horizontal"
        dataSource={currentVideo?.videoQuestions}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<QuestionCircleOutlined />}
              title={
                <div className="question-text" dangerouslySetInnerHTML={{ __html: item?.text }} />
              }
              description={
                <>
                  <CheckCircleOutlined />
                  <div
                    className="question-answer"
                    dangerouslySetInnerHTML={{ __html: item?.answer }}
                  />
                </>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ShowVideoQuestion;
