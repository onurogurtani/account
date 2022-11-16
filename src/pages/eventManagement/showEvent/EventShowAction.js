import { Popconfirm } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { confirmDialog, CustomButton, errorDialog, Text } from '../../../components';
import { addEvent, deleteEvent, editEvent } from '../../../store/slice/eventsSlice';

const EventShowAction = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentEvent } = useSelector((state) => state?.events);

  const eventData = {
    name: currentEvent?.name,
    description: currentEvent?.description,
    isActive: currentEvent?.isActive,
    isPublised: currentEvent?.isPublised,
    isDraft: currentEvent?.isDraft,
    formId: currentEvent?.formId,
    subCategoryId: currentEvent?.subCategoryId,
    participantGroups: currentEvent?.participantGroups?.map((item) => ({
      participantGroupId: item.participantGroupId,
    })),
    startDate: currentEvent?.startDate,
    endDate: currentEvent?.endDate,
  };

  const handleEdit = () => {
    history.push(`/event-management/edit/${id}`);
  };

  const handlePublishOrUnpublish = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: currentEvent?.isPublised
        ? 'Etkinliği yayından kaldırmak istediğinizden emin misiniz?'
        : 'Etkinliği yayınlamak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        console.log(currentEvent?.endDate, dayjs());
        if (
          dayjs().isAfter(currentEvent?.endDate, 'minute') ||
          dayjs().isSame(currentEvent?.endDate, 'minute')
        ) {
          //router state deki isDisableAllButDate sadece tarih editleneceği zaman diğer inputları disable etmek için
          history.push({
            pathname: `/event-management/edit/${id}`,
            state: { isDisableAllButDate: true },
          });
          return false;
        }
        const data = {
          event: {
            ...eventData,
            id: id,
            isPublised: currentEvent?.isPublised ? false : true,
            isDraft: false,
            isActive: true,
          },
        };
        const action = await dispatch(editEvent(data));
        if (editEvent.fulfilled.match(action)) {
          history.push('/event-management/list');
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

  const handleActiveOrPassive = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: currentEvent?.isActive
        ? 'Pasifleştirmek istediğinizden emin misiniz?'
        : 'Aktifleştirmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        const data = {
          event: {
            ...eventData,
            id: id,
            isActive: !currentEvent?.isActive,
          },
        };
        const action = await dispatch(editEvent(data));
        if (editEvent.fulfilled.match(action)) {
          history.push('/event-management/list');
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

  const handleCopy = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Etkinliğin kopyasını oluşturmak istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        const data = {
          event: {
            ...eventData,
            name: `${currentEvent?.name} kopyası`,
            isActive: false,
            isDraft: true,
            isPublised: false,
          },
        };
        const action = await dispatch(addEvent(data));
        if (addEvent.fulfilled.match(action)) {
          const copiedEventId = action?.payload?.data?.id;
          history.push(`/event-management/edit/${copiedEventId}`);
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

  const handleDelete = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Silmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        const action = await dispatch(deleteEvent({ id }));
        if (deleteEvent.fulfilled.match(action)) {
          history.push('/event-management/list?filter=true');
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
    <div className="event-actions-btn-group">
      <CustomButton
        type="primary"
        htmlType="submit"
        className="submit-btn"
        onClick={() => {
          history.push('/event-management/list?filter=true');
        }}
      >
        Geri
      </CustomButton>
      <CustomButton type="primary" htmlType="submit" className="edit-btn" onClick={handleEdit}>
        Düzenle
      </CustomButton>

      {!currentEvent?.isPublised && (
        <CustomButton type="primary" onClick={handleDelete} danger>
          Sil
        </CustomButton>
      )}

      <CustomButton type="primary" className="share-btn" onClick={handlePublishOrUnpublish}>
        {currentEvent?.isPublised ? 'Yayından Kaldır' : 'Yayınla'}
      </CustomButton>

      <CustomButton type="primary" className="copy-btn" onClick={handleCopy}>
        Kopyala
      </CustomButton>

      {!currentEvent?.isPublised && (
        <CustomButton type="primary" className="active-btn" onClick={handleActiveOrPassive}>
          {currentEvent?.isActive ? 'Pasifleştir' : 'Aktifleştir'}
        </CustomButton>
      )}
    </div>
  );
};

export default EventShowAction;
