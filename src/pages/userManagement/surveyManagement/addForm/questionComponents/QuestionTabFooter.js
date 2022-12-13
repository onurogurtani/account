import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classes from '../../../../../styles/surveyManagement/addSurvey.module.scss';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  confirmDialog,
  Text,
  warningDialog,
  successDialog,
} from '../../../../../components';
import SurveyPreviewModal from './SurveyPreviewModal';
import { updateForm } from '../../../../../store/slice/formsSlice';
const publishSituation = [
  { id: 1, value: 'Yayında' },
  { id: 2, value: 'Yayında değil' },
  { id: 3, value: 'Taslak' },
];

const QuestionTabFooter = ({
  setStep,
  step,
  currentForm,
  questionsOfForm,
  preview,
  setPreview,
}) => {
  const dispatch = useDispatch();
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const history = useHistory();
  const cancelHandler = async () => {
    confirmDialog({
      title: <Text t="attention" />,
      message:
        'İptal ettiğinizde bütün veriler silinecektir.İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        history.push('/user-management/survey-management');
      },
    });
  };

  const publishHandler = async () => {
    let allGroups = questionsOfForm.groupQuestions;
    let questionFreeGroups = [];
    for (let i = 0; i < allGroups.length; i++) {
      if (allGroups[i].questions.length == 0) {
        questionFreeGroups.push(allGroups[i].name);
      }
    }
    if (questionFreeGroups.length > 0) {
      let text = questionFreeGroups.toString();
      const replaced1 = text.replaceAll(',', ' , ');
      warningDialog({
        title: <Text t="attention" />,
        closeIcon: false,
        message: `${replaced1} isimli gruplara soru girişi yapmadınız. Lütfen ilgili gruplara soru girişi yapınız`,
        okText: 'Tamam',
      });
      return false;
    }
    let data = {
      form: {
        id: currentForm.id,
        publishStatus: 3,
      },
    };
    const action2 = await dispatch(updateForm(data));
    if (updateForm.fulfilled.match(action2)) {
      successDialog({
        title: <Text t="success" />,
        message: 'Anket başarıyla yayınlanmıştır',
      });
      history.push('/user-management/survey-management');
    }
  };
  const previewHandler = () => {
    setPreviewModalVisible(true);
    setPreview(true);
  };
  const handleClose = () => {
    setPreviewModalVisible(false);
    setPreview(false);
  };
  const saveAsDraftHandler = async () => {
    let data = {
      form: {
        id: currentForm.id,
        publishStatus: 3,
      },
    };
    const action = await dispatch(updateForm(data));
    if (updateForm.fulfilled.match(action)) {
      history.push('/user-management/survey-management');
    }
  };

  return (
    <>
      <SurveyPreviewModal
        previewModalVisible={previewModalVisible}
        setPreviewModalVisible={setPreviewModalVisible}
        currentForm={currentForm}
        questionsOfForm={questionsOfForm}
        handleClose={handleClose}
        preview={preview}
        setPreview={setPreview}
      />
      <div className={classes.buttonsContainer}>
        <CustomButton className={classes.saveButton} onClick={saveAsDraftHandler}>
          Taslak Olarak Kaydet
        </CustomButton>
        <CustomButton
          className={classes.previewButton}
          onClick={() => {
            previewHandler();
          }}
        >
          Anket Önizlemesini Göster
        </CustomButton>
        <CustomButton
          className={classes.cancelButton}
          onClick={() => {
            cancelHandler();
          }}
        >
          İptal
        </CustomButton>
        <CustomButton
          className={classes.backButton}
          onClick={() => {
            setStep('1');
          }}
        >
          Geri
        </CustomButton>
        <CustomButton className={classes.saveAndPublishButton} onClick={publishHandler}>
          Kaydet ve Yayınla
        </CustomButton>
      </div>
    </>
  );
};

export default QuestionTabFooter;
