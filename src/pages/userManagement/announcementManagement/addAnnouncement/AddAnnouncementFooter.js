import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomFormItem,
  Text,
  errorDialog,
} from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedAnnouncementTypes } from '../../../../store/slice/announcementSlice';

const AddAnnouncementFooter = ({
  form,
  setAnnouncementInfoData,
  setStep,
  // setIsErrorReactQuill,
  history,
}) => {
  const dispatch = useDispatch();
  const { announcementTypes } = useSelector((state) => state?.announcement);

  useEffect(() => {
    dispatch(getByFilterPagedAnnouncementTypes());
  }, []);

  const handleFindType = useCallback(
    (name) => {
      const type = announcementTypes.filter((t) => t.name === name);
      const selectedType = type[0];
      return selectedType;
    },
    [form],
  );

  const onFinish = useCallback(async () => {
    // CONTROLLİNG START AND END DATE
    const values = await form.validateFields();
    const startOfAnnouncement = values?.startDate
      ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    const endOfAnnouncement = values?.endDate
      ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    if (startOfAnnouncement >= endOfAnnouncement) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    }
    try {
      const values = await form.validateFields();

      const startDate = values?.startDate
        ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const startHour = values?.startDate
        ? dayjs(values?.startDate)?.utc().format('HH:mm:ss')
        : undefined;
      const endDate = values?.endDate
        ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD')
        : undefined;
      const endHour = values?.endDate
        ? dayjs(values?.endDate)?.utc().format('HH:mm:ss')
        : undefined;
      const type = handleFindType(values?.announcementType);

      const data = {
        announcementType: type,
        headText: values.headText.trim(),
        content: values.content,
        homePageContent: values.homePageContent,
        startDate: startDate + 'T' + startHour + '.000Z',
        endDate: endDate + 'T' + endHour + '.000Z',
        isPublished: false,
        isArchived: false,
      };

      setAnnouncementInfoData(data);
      setStep('2');
    } catch (error) {
      errorDialog({
        title: <Text t="error" />,
        message: 'error',
      });
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
