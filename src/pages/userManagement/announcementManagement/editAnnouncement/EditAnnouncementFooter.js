import React, { useCallback } from 'react';
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
}) => {
  const location = useLocation();
  const justDateEdit = location?.state?.justDateEdit;

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
          <CustomButton className="back-btn" onClick={() => setStep('2')}>
            Roller Sayfasına Git
          </CustomButton>
        )}
        <SaveAndFinish
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
