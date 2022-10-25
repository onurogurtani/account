import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
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
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedVideos } from '../../store/slice/videoSlice';
import { columns, sortFields } from './VideoListTableProperty';

const VideoList = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isVideoFilter, setisVideoFilter] = useState(false);

  const { videos, tableProperty, filterObject } = useSelector((state) => state?.videos);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = useCallback(async () => {
    await dispatch(getByFilterPagedVideos());
  }, [dispatch]);

  const addVideo = () => {
    history.push('/video-management/add');
  };

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: {
      goButton: <CustomButton className="go-button">Git</CustomButton>,
    },
    position: 'bottomRight',
    total: tableProperty?.totalCount,
    current: tableProperty?.currentPage,
    pageSize: tableProperty?.pageSize,
  };

  const onChangeTable = (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    if (sorter?.hasOwnProperty('column')) {
      data.OrderBy = sortFields[sorter.columnKey][sorter.order];
    }

    dispatch(getByFilterPagedVideos(data));
  };

  const showVideo = (record) => {
    history.push({
      pathname: `/video-management/show/${record.id}`,
    });
  };
  return (
    <CustomPageHeader
      title={<Text t="Videolar" />}
      showBreadCrumb
      showHelpButton
      routes={['Video Yönetimi']}
    >
      <CustomCollapseCard className="video-list" cardTitle={<Text t="Videolar" />}>
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addVideo}>
            YENİ VİDEO EKLE
          </CustomButton>
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
          dataSource={videos}
          onChange={onChangeTable}
          className="video-table-list"
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => showVideo(record),
            };
          }}
          pagination={paginationProps}
          rowKey={(record) => `video-list-${record?.id || record?.headText}`}
          scroll={{ x: false }}
        />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default VideoList;
