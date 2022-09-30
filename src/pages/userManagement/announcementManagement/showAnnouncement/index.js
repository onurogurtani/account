import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  Text,
} from '../../../../components';
import ShowAnnouncementTabs from './ShowAnnouncementTabs';
import '../../../../styles/announcementManagement/showAnnouncement.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAnnouncement,
  setPublishedAnnouncements,
  setArchiveAnnouncements,
  getByFilterPagedAnnouncements,
} from '../../../../store/slice/announcementSlice';
import dayjs from 'dayjs';
const ShowAnnouncement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const location = useLocation();
  const { filterObject } = useSelector((state) => state?.announcement);
  const showData = location?.state?.data;
  console.log(showData);
  const dispatch = useDispatch();
  const handleBack = () => {
    history.push('/user-management/announcement-management');
  };
  const handleEdit = () => {
    history.push({
      pathname: '/user-management/announcement-management/edit',
      state: { data: showData },
    });
  };
  const onDelete = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = showData.id;
        const action = await dispatch(deleteAnnouncement({ id }));
        if (deleteAnnouncement.fulfilled.match(action)) {
          history.push('/user-management/announcement-management');
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };
  const onShared = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Duyuruyu yayınlamak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        if (!dayjs().isBefore(dayjs(showData?.endDate))) {
          //not share
          history.push({
            pathname: '/user-management/announcement-management/edit',
            state: { data: showData, justDateEdit: true },
          });
          return;
        }

        let id = showData.id;
        const action = await dispatch(setPublishedAnnouncements({ id }));
        if (setPublishedAnnouncements.fulfilled.match(action)) {
          history.push('/user-management/announcement-management');
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };
  const setArchive = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Arşivlemek / Yayından Kaldırmak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = showData.id;
        const action = await dispatch(setArchiveAnnouncements({ id }));
        if (setArchiveAnnouncements.fulfilled.match(action)) {
          await dispatch(
            getByFilterPagedAnnouncements({
              ...filterObject,
              IsActive: false,
            }),
          );
          history.push({
            pathname: '/user-management/announcement-management',
            state: { data: { isPassiveRecord: true } },
          });
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };
  return (
    <>
      <CustomPageHeader
        title={<Text t="Duyuru Görüntüleme" />}
        showBreadCrumb
        showHelpButton
        routes={['Kullanıcı Yönetimi', 'Duyurular']}
      ></CustomPageHeader>
      <div className="btn-group">
        <CustomButton
          height={50}
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={handleBack}
        >
          Geri
        </CustomButton>
        <CustomButton
          height={50}
          type="primary"
          htmlType="submit"
          className="edit-btn"
          onClick={handleEdit}
        >
          Düzenle
        </CustomButton>
        <CustomButton
          height={50}
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={onDelete}
          danger
        >
          Sil
        </CustomButton>
        <CustomButton
          height={50}
          type="primary"
          htmlType="submit"
          className="shared-btn"
          onClick={onShared}
        >
          Yayınla
        </CustomButton>
        <CustomButton
          height={50}
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={setArchive}
          ghost
        >
          Arşivle
        </CustomButton>
      </div>
      <ShowAnnouncementTabs showData={showData} />
    </>
  );
};

export default ShowAnnouncement;
