import { Form } from 'antd';
import React from 'react';
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
import { useDispatch } from 'react-redux';
import { addEvent } from '../../../store/slice/eventsSlice';

const AddEvent = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

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
    values.startDate = values?.startDate.utc().format();
    values.endDate = values?.endDate.utc().format();
    if (!values.formId) {
      delete values?.subCategoryId;
    }
    console.log(values);
    const action = await dispatch(addEvent({ event: values }));
    if (addEvent.fulfilled.match(action)) {
      successDialog({
        title: <Text t="success" />,
        message: action?.payload.message,
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
