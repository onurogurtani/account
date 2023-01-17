import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
} from '../../../../components';
import {
  deleteAnnouncement,
  editAnnouncement,
  setActiveAnnouncements,
  setArchiveAnnouncements,
} from '../../../../store/slice/announcementSlice';
import '../../../../styles/announcementManagement/showAnnouncement.scss';
import ShowAnnouncementCard from './ShowAnnouncementCard';
import UpdateAnnouncementDate from './updateAnnouncementDate';
const ShowAnnouncement = () => {
  const location = useLocation();
  const history = useHistory();
  const [dateVisible, setDateVisible] = useState(false);
  const showData = location?.state?.data;
  const [currentAnnouncement, setCurrentAnnouncement] = useState(showData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentAnnouncement]);

  const dispatch = useDispatch();
  const handleBack = () => {
    history.push('/user-management/announcement-management');
  };
  const handleEdit = () => {
    history.push({
      pathname: '/user-management/announcement-management/edit',
      state: { data: currentAnnouncement },
    });
  };
  const onDelete = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = currentAnnouncement.id;
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
    const id = currentAnnouncement.id;
    if (!dayjs().isBefore(dayjs(currentAnnouncement?.endDate))) {
      setDateVisible(true);
    } else {
      confirmDialog({
        title: <Text t="attention" />,
        message: 'Duyuruyu yayınlamak istediğinizden emin misiniz?',
        okText: <Text t="Evet" />,
        cancelText: 'Hayır',
        onOk: async () => {
          let data = { ...currentAnnouncement, publishStatus: 1 };

          const action = await dispatch(editAnnouncement(data));
          if (editAnnouncement.fulfilled.match(action)) {
            history.push({
              pathname: '/user-management/announcement-management/show',
              state: { data: { ...currentAnnouncement, publishStatus: 1, isActive: true } },
            });
            setCurrentAnnouncement({ ...currentAnnouncement, publishStatus: 1, isActive: true });

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
    }
  };
  const unPublishAnnouncement = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Duyuruyu Yayından Kaldırmak İstediğinizden Emin Misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let data = { ...currentAnnouncement, publishStatus: 2 };

        const action = await dispatch(editAnnouncement(data));
        if (editAnnouncement.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...currentAnnouncement, publishStatus: 2 } },
          });

          setCurrentAnnouncement({ ...currentAnnouncement, publishStatus: 2 });

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
      message: 'Arşivlemek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = currentAnnouncement.id;
        const action = await dispatch(setArchiveAnnouncements({ id }));
        if (setArchiveAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...currentAnnouncement, isActive: false } },
          });
          setCurrentAnnouncement({ ...currentAnnouncement, isActive: false });

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
  const activeAnnouncement = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Arşivden kaldırmak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        let id = currentAnnouncement.id;
        const action = await dispatch(setActiveAnnouncements({ id }));
        if (setActiveAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...currentAnnouncement, isActive: true } },
          });
          setCurrentAnnouncement({ ...currentAnnouncement, isActive: true });
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
        <CustomButton type="primary" htmlType="submit" className="submit-btn" onClick={onDelete} danger>
          Sil
        </CustomButton>

        {currentAnnouncement.publishStatus === 1 && (
          <CustomButton type="primary" htmlType="submit" className="shared-btn" onClick={unPublishAnnouncement}>
            {'Yayından Kaldır'}
          </CustomButton>
        )}
        {currentAnnouncement.publishStatus !== 1 && (
          <CustomButton type="primary" htmlType="submit" className="shared-btn" onClick={publishAnnouncement}>
            {'Yayınla'}
          </CustomButton>
        )}

        {currentAnnouncement.publishStatus !== 1 && currentAnnouncement.isActive && (
          <CustomButton type="primary" htmlType="submit" className="archieveButton" onClick={archiveAnnouncement}>
            Arşivle
          </CustomButton>
        )}
        {currentAnnouncement.publishStatus !== 1 && !currentAnnouncement.isActive && (
          <CustomButton type="primary" htmlType="submit" className="archieveButton" onClick={activeAnnouncement}>
            Arşivden Kaldır
          </CustomButton>
        )}
      </div>
      <ShowAnnouncementCard showData={currentAnnouncement} />
      <UpdateAnnouncementDate
        setCurrentAnnouncement={setCurrentAnnouncement}
        currentAnnouncement={currentAnnouncement}
        dateVisible={dateVisible}
        setDateVisible={setDateVisible}
      />
    </>
  );
};

export default ShowAnnouncement;
