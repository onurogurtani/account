import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  Text,
  successDialog,
} from '../../../../components';
import ShowAnnouncementTabs from './ShowAnnouncementTabs';
import '../../../../styles/announcementManagement/showAnnouncement.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAnnouncement,
  setPublishAnnouncements,
  setUnPublishAnnouncements,
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
          successDialog({
            title: <Text t="success" />,
            message: action.payload?.message,
          });
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
  const publishAnnouncement = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Duyuruyu yayınlamak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        if (!dayjs().isBefore(dayjs(showData?.endDate))) {
          errorDialog({
            title: <Text t="error" />,
            message:
              'Duyuru bitiş tarihi sona erdiğinden dolayı duyuruyu yayınlamak çin bitiş tarihini güncellemeniz gerekmektedir!',
          });
          return;
        }

        let id = showData.id;
        const action = await dispatch(setPublishAnnouncements({ id }));
        if (setPublishAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...showData, isPublished: true } },
          });

          successDialog({
            title: <Text t="success" />,
            message: action.payload?.message,
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
  const unPublishAnnouncement = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Duyuruyu Yayından Kaldırmak İstediğinizden Emin Misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = showData.id;
        const action = await dispatch(setUnPublishAnnouncements({ id }));
        if (setUnPublishAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...showData, isPublished: false } },
          });

          successDialog({
            title: <Text t="success" />,
            message: action.payload?.message,
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
  const archiveAnnouncement = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Arşivlemek / Yayından Kaldırmak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = showData.id;
        const action = await dispatch(setArchiveAnnouncements({ id }));
        if (setArchiveAnnouncements.fulfilled.match(action)) {
          history.push({
            state: { data: { ...showData, isActive: false } },
          });
          await dispatch(
            getByFilterPagedAnnouncements({
              ...filterObject,
              IsActive: false,
            }),
          );
          successDialog({
            title: <Text t="success" />,
            message: action.payload?.message,
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
        <CustomButton type="primary" htmlType="submit" className="submit-btn" onClick={handleBack}>
          Geri
        </CustomButton>
        <CustomButton type="primary" htmlType="submit" className="edit-btn" onClick={handleEdit}>
          Düzenle
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={onDelete}
          danger
        >
          Sil
        </CustomButton>

        {showData.isPublished ? (
          <CustomButton
            type="primary"
            htmlType="submit"
            className="shared-btn"
            onClick={unPublishAnnouncement}
          >
            {'Yayından Kaldır'}
          </CustomButton>
        ) : (
          <CustomButton
            type="primary"
            htmlType="submit"
            className="shared-btn"
            onClick={publishAnnouncement}
          >
            {'Yayınla'}
          </CustomButton>
        )}

        {showData.isActive && !showData.isPublished && (
          <CustomButton
            type="primary"
            htmlType="submit"
            className="submit-btn"
            onClick={archiveAnnouncement}
            ghost
          >
            Arşivle
          </CustomButton>
        )}
      </div>
      <ShowAnnouncementTabs showData={showData} />
    </>
  );
};

export default ShowAnnouncement;
