import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { confirmDialog, CustomButton, CustomFormItem, Text, errorDialog, successDialog } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getByFilterPagedAnnouncementTypes, getAvatarUpload } from '../../../../store/slice/announcementSlice';
import { addAnnouncement} from '../../../../store/slice/announcementSlice';
import { getGroupsList } from '../../../../store/slice/groupsSlice';
import { useHistory } from 'react-router-dom';
import '../../../../styles/announcementManagement/saveAndFinish.scss';

const AddAnnouncementFooter = ({ form, setAnnouncementInfoData, setStep, fileImage }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { announcementTypes } = useSelector((state) => state?.announcement);
  const loadGroupsList = useCallback(async () => {
    await dispatch(getGroupsList());
  }, [dispatch]);
  useEffect(() => {
    loadGroupsList();
  }, []);

  const { groupsList } = useSelector((state) => state?.groups);

  const onFinish = useCallback(
    async (status) => {
      dispatch(getByFilterPagedAnnouncementTypes());
      const values = await form.validateFields();
      console.log(values);

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
        console.log(values);

        const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
        const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
        const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
        const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;
        const typeName = values.announcementType;

        const foundType = [];
        for (let i = 0; i < announcementTypes.length; i++) {
          if (announcementTypes[i].name == typeName) {
            foundType.push(announcementTypes[i]);
          }
        }
        let rolesArray = groupsList.filter(function (e) {
          return values.roles.indexOf(e.id) != -1;
        });
        const fileId = await dispatch(getAvatarUpload(fileImage));
        let data = {
          roles: rolesArray,
          announcementType: foundType[0],
          headText: values.headText.trim(),
          content: values.content,
          homePageContent: values.homePageContent,
          startDate: startDate + 'T' + startHour + '.000Z',
          endDate: endDate + 'T' + endHour + '.000Z',
          isArchived: false,
          fileId: fileId?.payload?.data?.id,
          buttonName: values.buttonName,
          buttonUrl: values.buttonUrl,
          publishStatus: status,
          announcementPublicationPlaces: values?.announcementPublicationPlaces,
          isPopupAvailable: values?.announcementPublicationPlaces.includes(3),
          isReadCheckbox: values?.isReadCheckbox,
        };
        const action = await dispatch(addAnnouncement(data));

        if (addAnnouncement.fulfilled.match(action)) {
          successDialog({
            title: <Text t="success" />,
            message: 'Yeni Duyuru Başarıyla Eklendi',
            onOk: () => {
              history.push('/user-management/announcement-management');
            },
          });
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
        }
      } catch (error) {
        errorDialog({
          title: <Text t="error" />,
          message: 'error',
        });
      }
    },
    [announcementTypes, dispatch, fileImage, form, setAnnouncementInfoData, setStep],
  );

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
      <CustomButton  className="draft-btn" onClick={() => onFinish(3)}>
        Taslak Olarak Kaydet
      </CustomButton>
      <CustomButton type="primary" className="save-and-finish-btn" onClick={() => onFinish(1)}>
        Kaydet ve Yayınla
      </CustomButton>
    </CustomFormItem>
  );
};

export default AddAnnouncementFooter;
