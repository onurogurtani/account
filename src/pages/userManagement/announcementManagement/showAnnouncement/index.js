import React, {useEffect, useState } from 'react';
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
import UpdateAnnouncementDate from './updateAnnouncementDate';
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
  const location = useLocation();
  const history = useHistory();
  const { filterObject } = useSelector((state) => state?.announcement);
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
          const action = await dispatch(setPublishAnnouncements({ id }));
          if (setPublishAnnouncements.fulfilled.match(action)) {
            history.push({
              pathname: '/user-management/announcement-management/show',
              state: { data: { ...currentAnnouncement, isPublished: true, isActive: true } },
            });
            setCurrentAnnouncement({ ...currentAnnouncement, isPublished: true, isActive: true });

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
        let id = currentAnnouncement.id;
        const action = await dispatch(setUnPublishAnnouncements({ id }));
        if (setUnPublishAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...currentAnnouncement, isPublished: false } },
          });

          setCurrentAnnouncement({ ...currentAnnouncement, isPublished: false });

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
        let id = currentAnnouncement.id;
        const action = await dispatch(setArchiveAnnouncements({ id }));
        if (setArchiveAnnouncements.fulfilled.match(action)) {
          history.push({
            pathname: '/user-management/announcement-management/show',
            state: { data: { ...currentAnnouncement, isActive: false, isPublished: false } },
          });
          setCurrentAnnouncement({ ...currentAnnouncement, isActive: false, isPublished: false });
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

        {currentAnnouncement.isPublished ? (
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

        {currentAnnouncement.isActive && !currentAnnouncement.isPublished && (
          <CustomButton
            type="primary"
            htmlType="submit"
            className="archieveButton"
            onClick={archiveAnnouncement}
          >
            Arşivle
          </CustomButton>
        )}
      </div>
      <ShowAnnouncementTabs showData={currentAnnouncement} />
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
