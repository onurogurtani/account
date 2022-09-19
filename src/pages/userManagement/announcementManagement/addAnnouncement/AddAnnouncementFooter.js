import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { confirmDialog, CustomButton, CustomFormItem, Text } from '../../../../components';

const AddAnnouncementFooter = ({
  form,
  setAnnouncementInfoData,
  setStep,
  setIsErrorReactQuill,
  history,
}) => {
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
          headText: values.headText,
          text: values.text,
          startDate: startDate + 'T' + startHour + '.000Z',
          endDate: endDate + 'T' + endHour + '.000Z',
          isActive: true,
        },
      };
      setAnnouncementInfoData(data);
      setStep('2');
    } catch (e) {
      !e.values.text && setIsErrorReactQuill(true);
    }
  }, [form, setAnnouncementInfoData, setStep]);

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: <Text t="Evet" />,
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/user-management/announcement-management');
      },
    });
  };
  return (
    <CustomFormItem className="footer-form-item add-announcement-footer">
      <CustomButton className="cancel-btn" onClick={onCancel}>
        İptal
      </CustomButton>
      <CustomButton type="primary" className="submit-btn" onClick={onFinish}>
        Kaydet ve İlerle
      </CustomButton>
    </CustomFormItem>
  );
};

export default AddAnnouncementFooter;
