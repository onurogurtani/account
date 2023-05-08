import { DownloadOutlined, FileOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { sanitize } from 'dompurify';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../../../components';
import { downloadFile } from '../../../store/slice/fileSlice';

const ShowVideoDocument = () => {
  const dispatch = useDispatch();

  const { currentVideo } = useSelector((state) => state?.videos);

  const download = (file) => {
    dispatch(downloadFile(file));
  };

  return (
    <div className="document-list">
      <List
        itemLayout="horizontal"
        dataSource={currentVideo?.videoFiles || []}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileOutlined />}
              title={item?.file?.fileName}
              description={
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: sanitize(item?.file?.description) }}
                />
              }
            />
            <CustomButton
              onClick={() => download(item?.file)}
              icon={<DownloadOutlined style={{ fontSize: '20px' }} />}
              type="link"
            ></CustomButton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ShowVideoDocument;
