import { Form } from 'antd';
import React, { useEffect } from 'react';
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
import '../../../styles/eventsManagement/addEvent.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEvent,
  getSurveyListWithSelectedSurveyCategory,
} from '../../../store/slice/eventsSlice';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const AddEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const isCopy = location?.state?.isCopy;
  const currentEvent = location?.state?.currentEvent;

  useEffect(() => {
    if (isCopy) {
      setFormFieldsValue();
    }
  }, []);

  const setFormFieldsValue = async () => {
    if (currentEvent?.formId) {
      await dispatch(getSurveyListWithSelectedSurveyCategory(currentEvent?.form?.categoryOfFormId));
    } // etkinliğe eklenen anket varsa

    form.setFieldsValue({
      name: `${currentEvent?.name} kopyası`,
      description: currentEvent?.description,
      isActive: currentEvent?.isActive,
      isPublised: currentEvent?.isPublised,
      isDraft: currentEvent?.isDraft,
      formId: currentEvent?.formId,
      categoryOfFormId: currentEvent?.form?.categoryOfFormId,
      participantGroups: currentEvent?.participantGroups?.map((item) => item.participantGroupId),
      startDate: dayjs(currentEvent?.startDate),
      endDate: dayjs(currentEvent?.endDate),
    });
  };

  const handleBackButton = () => {
    history.push('/event-management/list');
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
    values.isPublised = isPublised;
    values.isDraft = isDraft;
    values.participantGroups = values.participantGroups.map((item) => ({
      participantGroupId: item,
    }));
    values.startDate = values?.startDate.utc();
    values.endDate = values?.endDate.utc();
    if (!values.formId) {
      delete values?.categoryOfFormId;
    }
    values.isActive = true;
    console.log(values);
    const action = await dispatch(addEvent({ event: values }));
    if (addEvent.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: 'Etkinlik Başarıyla Oluşturuldu',
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
      <CustomPageHeader title="Etkinlik Ekle" routes={['Etkinlik Yönetimi']} showBreadCrumb>
        <CustomButton
          type="primary"
          htmlType="submit"
          className="submit-btn"
          onClick={handleBackButton}
          style={{ margin: '0px 10px 20px' }}
        >
          Geri
        </CustomButton>
        <CustomCollapseCard cardTitle="Etkinlik Ekle">
          <div className="add-event-container">
            <div className="add-event-form">
              <CustomForm
                labelCol={{ flex: '250px' }}
                autoComplete="off"
                layout="horizontal"
                form={form}
                name="form"
                // initialValues={{
                //   isActive: true,
                // }}
              >
                <EventForm form={form} />
              </CustomForm>
            </div>
            <div className="add-event-footer">
              <CustomButton onClick={onCancel} type="primary" className="cancel-btn">
                İptal
              </CustomButton>
              <CustomButton
                onClick={() => onFinish(false, true)}
                type="primary"
                className="save-draft-btn"
              >
                Taslak Olarak Kaydet
              </CustomButton>
              <CustomButton
                onClick={() => onFinish(true, false)}
                type="primary"
                className="save-btn"
              >
                Kaydet ve Yayınla
              </CustomButton>
            </div>
          </div>
        </CustomCollapseCard>
      </CustomPageHeader>
    </>
  );
};

export default AddEvent;
