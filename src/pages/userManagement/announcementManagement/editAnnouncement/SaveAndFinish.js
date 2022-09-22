import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomImage, CustomModal, errorDialog, Text } from '../../../../components';
import {
  createOrUpdateAnnouncementRole,
  editAnnouncement,
} from '../../../../store/slice/announcementSlice';
import modalSuccessIcon from '../../../../assets/icons/icon-modal-success.svg';
import '../../../../styles/announcementManagement/saveAndFinish.scss';

const SaveAndFinish = ({
  form,
  currentId,
  selectedRole,
  setStep,
  history,
  setIsErrorReactQuill,
  justDateEdit,
}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState();

  const onFinish = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const startDate = values?.startDate
        ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const startHour = values?.startDate
        ? dayjs(values?.startHour)?.utc().format('HH:mm:ss')
        : undefined;
      const endDate = values?.endDate
        ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const endHour = values?.endHour
        ? dayjs(values?.endHour)?.utc().format('HH:mm:ss')
        : undefined;
      const data = {
        entity: {
          id: currentId,
          headText: values.headText.trim(),
          text: values.text,
          startDate: startDate + 'T' + startHour + '.000Z',
          endDate: endDate + 'T' + endHour + '.000Z',
          isActive: true,
        },
      };
      if (justDateEdit) {
        data.entity.isPublished = true;
      }
      if (selectedRole.length === 0) {
        errorDialog({
          title: <Text t="error" />,
          message: 'Lütfen en az bir rol seçimi yapınız',
          onOk: () => {
            setStep('2');
          },
        });

        return;
      }
      setCurrentAnnouncement({ ...data.entity, groups: [...selectedRole] });
      const action = await dispatch(editAnnouncement(data));
      if (editAnnouncement.fulfilled.match(action)) {
        let groupIds = selectedRole.map((d) => d.id);
        const actioncreateOrUpdateAnnouncementRole = await dispatch(
          createOrUpdateAnnouncementRole({
            announcementId: action?.payload?.data?.id,
            groupIds: groupIds,
          }),
        );

        if (createOrUpdateAnnouncementRole.fulfilled.match(actioncreateOrUpdateAnnouncementRole)) {
          setIsVisible(true);
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: actioncreateOrUpdateAnnouncementRole?.payload?.message,
          });
        }
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    } catch (e) {
      !e.values.text && setIsErrorReactQuill(true);
      setStep('1');
    }
  }, [form, setStep, selectedRole]);

  return (
    <>
      <CustomModal
        maskClosable={false}
        footer={false}
        title={
          <>
            <CustomImage src={modalSuccessIcon} /> <span>Kayıt Güncellendi</span>
          </>
        }
        visible={isVisible}
        closable={false}
        className={'success-finish-modal'}
      >
        <p>Şimdi Ne yapmak İstersin?</p>
        <CustomButton
          type="primary"
          onClick={() =>
            history.push({
              pathname: '/user-management/announcement-management/show',
              state: { data: currentAnnouncement },
            })
          }
          className="submit-btn mb-2 mt-2"
        >
          Güncellenen Kaydı Görüntüle
        </CustomButton>
        <CustomButton
          type="primary"
          onClick={() => history.push('/user-management/announcement-management')}
          className="submit-btn"
        >
          Tüm Kayıtları Görüntüle
        </CustomButton>
      </CustomModal>
      <CustomButton type="primary" onClick={onFinish} className="submit-btn">
        {justDateEdit ? 'Kaydet ve Yayınla' : 'Kaydet ve Bitir'}
      </CustomButton>
    </>
  );
};

export default SaveAndFinish;
