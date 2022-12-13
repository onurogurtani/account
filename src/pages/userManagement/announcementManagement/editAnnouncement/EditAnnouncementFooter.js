import React, { useCallback } from 'react';
import { errorDialog } from '../../../../components';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { confirmDialog, CustomButton, CustomFormItem, Text } from '../../../../components';
import SaveAndFinish from './SaveAndFinish';
const EditAnnouncementFooter = ({
  form,
  setAnnouncementInfoData,
  setStep,
  setIsErrorReactQuill,
  history,
  selectedRole,
  announcementInfoData,
  currentId,
  fileImage,
}) => {
  const location = useLocation();
  const justDateEdit = location?.state?.justDateEdit;

  const goToRolesPage = async () => {
    const values = await form.validateFields();
    if (dayjs(values.endDate).isBefore(dayjs(values.startDate))) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
      });
      return;
    } else if (!dayjs().isBefore(dayjs(values.endDate))) {
      errorDialog({
        title: <Text t="error" />,
        message: 'Duyuru Bitiş Tarihi Geçmiş Bir Tarih Olmamalıdır',
      });
      return;
    } else {
      setStep('2');
    }
  };

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
    <div className="">
      <CustomFormItem className="footer-form-item add-announcement-footer">
        <CustomButton className="cancel-btn" onClick={onCancel}>
          İptal
        </CustomButton>

        {!justDateEdit && (
          <CustomButton className="back-btn" onClick={goToRolesPage}>
            Roller Sayfasına Git
          </CustomButton>
        )}
        <SaveAndFinish
          fileImage={fileImage}
          form={form}
          currentId={currentId}
          selectedRole={selectedRole}
          setStep={setStep}
          history={history}
          setIsErrorReactQuill={setIsErrorReactQuill}
          justDateEdit={justDateEdit}
        />
      </CustomFormItem>
    </div>
  );
};

export default EditAnnouncementFooter;
