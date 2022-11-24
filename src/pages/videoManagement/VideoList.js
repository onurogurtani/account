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
import { getByFilterPagedVideos, setIsFilter, setSorterObject } from '../../store/slice/videoSlice';
import { Tag } from 'antd';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const VideoList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let query = useQuery();

  const [isVideoFilter, setisVideoFilter] = useState(false);

  const { videos, tableProperty, filterObject, sorterObject, isFilter } = useSelector(
    (state) => state?.videos,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (query.get('filter')) {
      isFilter && setisVideoFilter(true);
      loadVideos(filterObject);
    } else {
      dispatch(setSorterObject({}));
      dispatch(setIsFilter(false));
      loadVideos();
    }
  }, []);

  const loadVideos = useCallback(
    async (data) => {
      await dispatch(getByFilterPagedVideos(data));
    },
    [dispatch],
  );

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

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    const data = { ...filterObject };

    if (extra?.action === 'paginate') {
      data.PageNumber = pagination.current;
      data.PageSize = pagination.pageSize;
    }

    if (extra?.action === 'sort') {
      if (sorter?.order) {
        await dispatch(setSorterObject({ columnKey: sorter.columnKey, order: sorter.order }));
      } else {
        await dispatch(setSorterObject({}));
      }
      data.OrderBy = sortFields[sorter.columnKey][sorter.order];
      data.PageNumber = 1;
    }

    await dispatch(getByFilterPagedVideos(data));
  };

  const showVideo = (record) => {
    history.push({
      pathname: `/video-management/show/${record.id}`,
    });
  };

  const columns = [
    {
      title: 'VİDEO KODU',
      dataIndex: 'kalturaVideoId',
      key: 'kalturaVideoId',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'kalturaVideoId' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'DURUM',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => {
        return (
          <div>
            {record.isActive ? (
              <Tag color="green" key={1}>
                Aktif
              </Tag>
            ) : (
              <Tag color="red" key={2}>
                Pasif
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: 'KATEGORİ',
      dataIndex: 'categoryOfVideo',
      key: 'categoryOfVideo',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'categoryOfVideo' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text?.name}</div>;
      },
    },
    {
      title: 'BAĞLI OLDUĞU PAKET',
      dataIndex: 'packages',
      key: 'packages',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'packages' ? sorterObject?.order : null,
      render: (_, record) => (
        <>
          {record.packages?.map((item, id) => {
            return (
              <Tag className="m-1" color="blue" key={id}>
                {item.package.name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'DERS',
      dataIndex: 'lesson',
      key: 'lesson',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'lesson' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'ÜNİTE',
      dataIndex: 'lessonUnit',
      key: 'lessonUnit',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'lessonUnit' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'KONU',
      dataIndex: 'lessonSubject',
      key: 'lessonSubject',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'lessonSubject' ? sorterObject?.order : null,
      render: (text, record) => {
        return <div>{text.name}</div>;
      },
    },
    {
      title: 'ALT BAŞLIK',
      dataIndex: 'lessonSubSubjects',
      key: 'lessonSubSubjects',
      sorter: true,
      sortOrder: sorterObject?.columnKey === 'lessonSubSubjects' ? sorterObject?.order : null,
      render: (_, record) => (
        <>
          {record.lessonSubSubjects?.map((item, id) => {
            return (
              <Tag className="m-1" color="gold" key={id}>
                {item.lessonSubSubject.name}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const sortFields = {
    kalturaVideoId: { ascend: 'KalturaVideoIdASC', descend: 'KalturaVideoIdDESC' },
    categoryOfVideo: { ascend: 'CategoryASC', descend: 'CategoryDESC' },
    packages: { ascend: 'PackageASC', descend: 'PackageDESC' },
    lesson: { ascend: 'LessonASC', descend: 'LessonDESC' },
    lessonUnit: { ascend: 'LessonUnitASC', descend: 'LessonUnitDESC' },
    lessonSubject: { ascend: 'LessonSubjectASC', descend: 'LessonSubjectDESC' },
    lessonSubSubjects: { ascend: 'LessonSubSubjectASC', descend: 'LessonSubSubjectDESC' },
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
