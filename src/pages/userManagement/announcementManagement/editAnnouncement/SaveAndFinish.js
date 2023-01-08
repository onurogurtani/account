import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CustomButton, CustomImage, CustomModal, errorDialog, Text, successDialog } from '../../../../components';
import { editAnnouncement, getAvatarUpload } from '../../../../store/slice/announcementSlice';
import modalSuccessIcon from '../../../../assets/icons/icon-modal-success.svg';
import '../../../../styles/announcementManagement/saveAndFinish.scss';

const SaveAndFinish = ({
  form,
  step,
  currentId,
  selectedRole,
  setStep,
  history,
  setIsErrorReactQuill,
  justDateEdit,
  fileImage,
  initialValues
}) => {
  console.log(initialValues);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState();
  const { announcementTypes, updateAnnouncementObject } = useSelector((state) => state?.announcement);
  const [updatedAnnouncement, setUpdatedAnnouncement] = useState({});
  const location = useLocation();
  const oldAnnouncement = location?.state?.data;

  const onFinish = useCallback(async () => {
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
      const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
      const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
      const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
      const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;
      const typeName = values.announcementType;

      const transFormedType = [];
      for (let i = 0; i < announcementTypes.length; i++) {
        if (announcementTypes[i].name == typeName) {
          transFormedType.push(announcementTypes[i]);
        }
      }
      let fileId = updateAnnouncementObject?.fileId;

      if(Array.isArray(values.fileId)){
        let res = await dispatch(getAvatarUpload(fileImage));
        fileId=await res?.payload?.data?.id
        console.log(fileId)
      }

      const data = {
        id: currentId,
        announcementType: transFormedType[0],
        headText: values.headText.trim(),
        content: values.content,
        homePageContent: values.homePageContent,
        startDate: startDate + 'T' + startHour + '.000Z',
        endDate: endDate + 'T' + endHour + '.000Z',
        fileId: fileId,
        buttonName: values.buttonName,
        buttonUrl: values.buttonUrl,
        isArchived: false,
        isPublished: true,
      };
      console.log(data);
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
      var newData = { ...data, roles: [...selectedRole] };

      const action = await dispatch(editAnnouncement(newData));

      if (editAnnouncement.fulfilled.match(action)) {
        setIsVisible(true);
        setUpdatedAnnouncement({ ...oldAnnouncement, ...newData });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    } catch (error) {
      setStep('1');
      errorDialog({
        title: <Text t="error" />,
        message: error,
      });
    }
  }, [
    form,
    fileImage,
    dispatch,
    currentId,
    updateAnnouncementObject?.fileId,
    selectedRole,
    announcementTypes,
    setStep,
    oldAnnouncement,
  ]);

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
          onClick={() => {
            history.push({
              pathname: '/user-management/announcement-management/show',
              state: { data: updatedAnnouncement },
            });
          }}
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
      {step==1 &&  (<CustomButton type="primary" onClick={onFinish} className="submit-btn">
        {'Kaydet ve Bitir'}
      </CustomButton>) }
     
      {/* <CustomButton type="primary" onClick={onFinish} className="submit-btn">
        {justDateEdit ? 'Kaydet ve Yayınla' : 'Kaydet ve Bitir'}
      </CustomButton>
      <CustomButton type="primary" onClick={onFinish} className="submit-btn">
        {justDateEdit ? 'Kaydet ve Yayınla' : 'Kaydet ve Bitir'}
      </CustomButton> */}
    </>
  );
};

export default SaveAndFinish;
