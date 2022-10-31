import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  confirmDialog,
  CustomButton,
  CustomPageHeader,
  errorDialog,
  Text,
} from '../../../components';
import { deleteVideo, getByVideoId } from '../../../store/slice/videoSlice';
import ShowVideoTabs from './ShowVideoTabs';
import '../../../styles/videoManagament/showVideo.scss';

const ShowVideo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadVideo(id);
  }, []);

  const loadVideo = useCallback(
    async (id) => {
      const action = await dispatch(getByVideoId(id));
      if (!getByVideoId.fulfilled.match(action)) {
        if (action?.payload?.message) {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
          history.push('/video-management/list');
        }
      }
    },
    [dispatch],
  );

  const handleDelete = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        const action = await dispatch(deleteVideo(id));
        if (deleteVideo.fulfilled.match(action)) {
          history.push('/video-management/list?filter=true');
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
  const handleEdit = () => {
    history.push(`/video-management/edit/${id}`);
  };
  return (
    <div className="show-video">
      <CustomPageHeader
        title="Video Görüntüleme"
        showBreadCrumb
        showHelpButton
        routes={['Video Yönetimi', 'Videolar']}
      ></CustomPageHeader>

      <div className="header">
        <CustomButton
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={() => {
            history.push('/video-management/list?filter=true');
          }}
        >
          Geri
        </CustomButton>
        <CustomButton type="primary" htmlType="submit" className="edit-btn" onClick={handleEdit}>
          Düzenle
        </CustomButton>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={handleDelete}
          danger
        >
          Sil
        </CustomButton>
      </div>
      <ShowVideoTabs />
    </div>
  );
};

export default ShowVideo;
