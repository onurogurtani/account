import React, { useCallback, useState } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomPageHeader,
  CustomTable,
  Text,
} from '../../components';
import VideoFilter from './VideoFilter';
import iconFilter from '../../assets/icons/icon-filter.svg';
import '../../styles/table.scss';
import '../../styles/videoManagament/videoList.scss';

let Video = [
  { id: 1, name: 'video 1' },
  { id: 2, name: 'video 2' },
];
const VideoList = () => {
  const [isVideoFilter, setisVideoFilter] = useState(false);
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
  ];
  const handleDelete = useCallback(() => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Seçilen Videoları Silmek İstediğinizden Emin Misiniz?',
      onOk: async () => {},
    });
  }, []);

  const handleDisable = useCallback(() => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Seçilen Videoları Yayından Kaldırmak Pasifleştirmek İstediğinizden Emin Misiniz?',
      onOk: async () => {},
    });
  }, []);

  const handleActive = useCallback(() => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Seçilen Videoları Aktifleştirmek/Yayınlamak İstediğinizden Emin Misiniz?',
      onOk: async () => {},
    });
  }, []);

  return (
    <CustomPageHeader
      title={<Text t="Videolar" />}
      showBreadCrumb
      //   showHelpButton
      routes={['Video Yönetimi']}
    >
      <CustomCollapseCard className="video-list" cardTitle={<Text t="Videolar" />}>
        <div className="table-header">
          <CustomButton className="add-btn">YENİ VİDEO EKLE</CustomButton>
          <CustomButton
            data-testid="search"
            className="search-btn"
            onClick={() => setisVideoFilter((prev) => !prev)}
          >
            <CustomImage src={iconFilter} />
          </CustomButton>
        </div>
        {isVideoFilter && <VideoFilter />}
        <CustomTable
          dataSource={Video}
          // onChange={handleSort}
          rowSelection
          columns={columns}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: (event) => showAnnouncement(record),
          //   };
          // }}
          // footer={() => <TableFooter paginationProps={paginationProps} />}
          pagination={false}
          rowKey={(record) => `video-list-${record?.id || record?.headText}`}
          scroll={{ x: false }}
        />
        <div className="btn-group">
          <CustomButton danger type="primary" onClick={handleDelete}>
            Seçilenleri Sil
          </CustomButton>
          <CustomButton className="disable-btn" type="primary" onClick={handleDisable}>
            Seçilenleri yayından kaldır
          </CustomButton>
          <CustomButton className="shared-btn" type="primary" onClick={handleActive}>
            Aktifleştir / Yayınla
          </CustomButton>
        </div>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default VideoList;
