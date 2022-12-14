import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { confirmDialog, CustomButton, CustomFormItem, Text, errorDialog } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedAnnouncementTypes, getAvatarUpload } from '../../../../store/slice/announcementSlice';
import { FORM_DATA_CONVERT } from '../../../../utils/utils';
import fileServices from '../../../../services/file.services';

const AddAnnouncementFooter = ({ form, setAnnouncementInfoData, setStep, history, fileImage }) => {
  const dispatch = useDispatch();
  const { announcementTypes } = useSelector((state) => state?.announcement);

  const onFinish = useCallback(async () => {
    // CONTROLLİNG START AND END DATE
    dispatch(getByFilterPagedAnnouncementTypes());
    const values = await form.validateFields();
    const startOfAnnouncement = values?.startDate
      ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm')
      : undefined;

    const endOfAnnouncement = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm') : undefined;

    if (startOfAnnouncement >= endOfAnnouncement) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    }
    try {
      const values = await form.validateFields();

      const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
      const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
      const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
      const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;
      const typeName = values.announcementType;

      const hop = [];
      for (let i = 0; i < announcementTypes.length; i++) {
        if (announcementTypes[i].name == typeName) {
          hop.push(announcementTypes[i]);
        }
      }
      const fileId = await dispatch(getAvatarUpload(fileImage));
      let data = {
        announcementType: hop[0],
        headText: values.headText.trim(),
        content: values.content,
        homePageContent: values.homePageContent,
        startDate: startDate + 'T' + startHour + '.000Z',
        endDate: endDate + 'T' + endHour + '.000Z',
        isPublished: false,
        isArchived: false,
        fileId: fileId.payload.data.id,
        buttonName: values.buttonName,
        buttonUrl: values.buttonUrl,
      };
      setAnnouncementInfoData(data);
      setStep('2');
    } catch (error) {
      console.log(error);
      errorDialog({
        title: <Text t="error" />,
        message: 'error',
      });
    }
  }, [announcementTypes, dispatch, fileImage, form, setAnnouncementInfoData, setStep]);

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
