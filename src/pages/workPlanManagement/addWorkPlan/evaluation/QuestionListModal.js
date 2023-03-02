import React, { useCallback, useEffect } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomImage,
  CustomModal,
  errorDialog,
  successDialog,
  Text,
} from '../../../../components';
import modalClose from '../../../../assets/icons/icon-close.svg';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../styles/workPlanManagement/questionListModal.scss';
import { useHistory } from 'react-router-dom';
import { addWorkPlan, resetAllData } from '../../../../store/slice/workPlanSlice';

const QuestionListModal = ({ modalVisible, handleModalVisible, modalTitle, selectedRowData, setIsExit }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { evaluationTab, subjectChooseTab, activeKey } = useSelector((state) => state?.workPlan);

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      handleModalVisible(false);
    },
    [handleModalVisible],
  );

  useEffect(() => {
    if (evaluationTab.questionList.length > 0) {
      console.log('sorular listesi-> ', evaluationTab.questionList);
    }
  }, [evaluationTab.questionList]);

  const onUpdate = () => {

    confirmDialog({
      title: <Text t='attention' />,
      htmlContent: 'Taslak olarak kaydetmeden çıkmak istediğinize emin misiniz sorular?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        setIsExit(true);
        await console.log('kaydedilmedi...');
        await dispatch(resetAllData());
        history.push({
          pathname: '/test-management/assessment-and-evaluation/edit',
          state: { data: { selectedRowData } },
        });
      },
      onCancel: async () => {
        setIsExit(true);
        await saveDrafted(selectedRowData)
        // await console.log('kaydedildi...');
        // await dispatch(resetAllData());
        // history.push({
        //   pathname: '/test-management/assessment-and-evaluation/edit',
        //   state: { data: { selectedRowData } },
        // });
      },
    });
  };

  const saveDrafted = async (rowData) => {

    if (Object.keys(evaluationTab.selectedRowData).length > 0) {

      const body = {
        workPLan: {
          activeKey,
          asEvId: evaluationTab.selectedRowData.id,
          videoId: subjectChooseTab.selectedRowVideo.id,
          publishStatus: 3,
          classroomId: subjectChooseTab.filterObject.ClassroomId,
          lessonUnitId: subjectChooseTab.filterObject.LessonUnitIds,
          lessonSubjectId: subjectChooseTab.filterObject.LessonSubjectIds,
          lessonId: subjectChooseTab.filterObject.LessonIds,
          educationYearId: subjectChooseTab.formData.educationYear,
          // asEvId: 1,
          workPlanQuestionOfExams: [],
          workPlanVideos: [],
          workPlanLessonSubSubjects: [],
        },
      };

      const action = await dispatch(addWorkPlan(body));
      if (addWorkPlan?.fulfilled?.match(action)) {
        successDialog({
          title: <Text t='successfullySent' />,
          message: action.payload?.message,
          onOk: async () => {
            console.log('kaydedildi...');
            await dispatch(resetAllData());
            history.push({
              pathname: '/test-management/assessment-and-evaluation/edit',
              state: { data: { rowData } },
            });
          },
        });
      } else {
        errorDialog({
          title: <Text t='error' />,
          message: action.payload?.message,
        });
      }
    } else {
      errorDialog({
        title: <Text t='error' />,
        message: 'Lütfen Ölçme ve Değerlendirme testi ekleyiniz...',
      });
    }
  };

  return (
    <CustomModal
      className='question-list-modal'
      width={650}
      maskClosable={false}
      footer={false}
      title={modalTitle}
      visible={modalVisible}
      onCancel={handleClose}
      closeIcon={<CustomImage src={modalClose} />}
    >
      <div className='question-list'>
        {evaluationTab?.questionList.map((item, key) => {
          return <div className='question-list-item' key={key}>
            <span>{key + 1}- </span>
            <img
              width={450}
              alt='logo'
              src={`data:image/png;base64,${item?.questionOfExam.file?.fileBase64}`}
            />
          </div>;
        })}

        <div className='action-content'>
          <CustomButton className='edit-btn' onClick={onUpdate}>
            Testi Düzenle
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default QuestionListModal;
