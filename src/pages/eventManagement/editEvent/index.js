import { Form } from 'antd';
import React, { useCallback, useEffect } from 'react';
import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomForm,
  CustomPageHeader,
  errorDialog,
  successDialog,
  Text,
} from '../../../components';
import EventForm from '../forms/EventForm';
import '../../../styles/eventsManagement/addEvent.scss'; // farklı bi tasarım istenirse editEvent.scss oluşturulur
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  editEvent,
  getByEventId,
  getSurveyListWithSelectedSurveyCategory,
} from '../../../store/slice/eventsSlice';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import ModuleShowFooter from '../../../components/ModuleShowFooter';

const EditEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const { id } = useParams();

  const { currentEvent } = useSelector((state) => state?.events);
  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  useEffect(() => {
    loadEvent(id);
  }, []);

  const loadEvent = useCallback(
    async (id) => {
      const action = await dispatch(getByEventId(id));
      if (!getByEventId.fulfilled.match(action)) {
        if (action?.payload?.message) {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
          history.push('/event-management/list');
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (currentEvent?.formId) {
      const action = dispatch(getSurveyListWithSelectedSurveyCategory(currentEvent?.subCategoryId));
    } // etkinliğe eklenen anket varsa
    if (Object.keys(currentEvent)) {
      form.setFieldsValue({
        name: currentEvent?.name,
        description: currentEvent?.description,
        isActive: currentEvent?.isActive,
        isPublised: currentEvent?.isPublised,
        isDraft: currentEvent?.isDraft,
        formId: currentEvent?.formId,
        subCategoryId: currentEvent?.subCategoryId,
        participantGroups: currentEvent?.participantGroups?.map((item) => item.participantGroupId),
        startDate: dayjs(currentEvent?.startDate),
        endDate: dayjs(currentEvent?.endDate),
      });
      if (isDisableAllButDate) {
        //isDisableAllButDate sadece tarih editlenebilceği zaman
        form.validateFields(['startDate', 'endDate']);
      }
    }
  }, [currentEvent]);

  const handleBackButton = () => {
    history.push(`/event-management/show/${id}`);
  };

  const onCancel = () => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'İptal etmek istediğinizden emin misiniz?',
      okText: 'Evet',
      cancelText: 'Hayır',
      onOk: async () => {
        handleBackButton();
      },
    });
  };

  const onFinish = async (isPublised, isDraft) => {
    const values = await form.validateFields();
    values.id = id;
    values.isPublised = isPublised;
    if (isPublised) {
      values.isActive = true;
    }
    values.isDraft = isDraft;
    values.participantGroups = values.participantGroups.map((item) => ({
      participantGroupId: item,
    }));
    values.startDate = values?.startDate.utc();
    values.endDate = values?.endDate.utc();
    if (!values.formId) {
      delete values?.subCategoryId;
    }
    console.log(values);
    const action = await dispatch(editEvent({ event: values }));
    if (editEvent.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: 'Etkinlik Başarıyla Güncellendi',
        onOk: async () => {
          history.push('/event-management/list');
        },
      });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload.message,
      });
    }
  };

  return (
    <>
      <CustomPageHeader title="Etkinlik Düzenleme" routes={['Etkinlik Yönetimi']} showBreadCrumb>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={handleBackButton}
          style={{ margin: '0px 10px 20px' }}
        >
          Geri
        </CustomButton>
        <CustomCollapseCard cardTitle="Etkinlik Düzenle">
          <div className="add-event-container">
            <div className="add-event-form">
              <CustomForm
                labelCol={{ flex: '250px' }}
                autoComplete="off"
                layout="horizontal"
                form={form}
                name="form"
                initialValues={{
                  isActive: true,
                }}
              >
                <EventForm form={form} />
              </CustomForm>
            </div>
            <div className="add-event-footer">
              <CustomButton onClick={onCancel} type="primary" className="cancel-btn">
                İptal
              </CustomButton>
              {!currentEvent?.isPublised && (
                <CustomButton
                  onClick={() => onFinish(false, true)}
                  type="primary"
                  className="save-draft-btn"
                >
                  Taslak Olarak Kaydet
                </CustomButton>
              )}

              <CustomButton
                onClick={() => onFinish(true, false)}
                type="primary"
                className="save-btn"
              >
                Güncelle ve Yayınla
              </CustomButton>
            </div>
          </div>
        </CustomCollapseCard>
        <ModuleShowFooter
          insertTime={currentEvent?.insertTime}
          insertUserFullName={currentEvent?.insertUserFullName}
          updateTime={currentEvent?.updateTime}
          updateUserFullName={currentEvent?.updateUserFullName}
        />
      </CustomPageHeader>
    </>
  );
};

export default EditEvent;
