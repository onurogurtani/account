import { Alert, Form } from 'antd';
import warning from '../../assets/icons/icon-profil-warning.svg';
import {
  CustomButton,
  CustomCheckbox,
  CustomForm,
  CustomFormItem,
  CustomImage,
  errorDialog,
  Text,
} from '../../components';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const CommunicationPreferences = ({ handleUpdate }) => {
  const { currentUser } = useSelector((state) => state?.user);

  const [form] = Form.useForm();

  const onFinish = useCallback(
    async (values) => {
      try {
        handleUpdate({
          id: currentUser?.id,
          contactBySMS: values?.contactBySMS,
          contactByMail: values?.contactByMail,
          contactByCall: values?.contactByCall,
        });
      } catch (error) {
        errorDialog({
          title: <Text t="error" />,
          message: error?.message,
        });
      }
    },
    [currentUser, handleUpdate],
  );

  const onCancel = useCallback(() => {
    form.setFieldsValue({
      contactBySMS: currentUser?.contactBySMS,
      contactByMail: currentUser?.contactByMail,
      contactByCall: currentUser?.contactByCall,
    });
  }, [currentUser, form]);

  return (
    <div>
      <div className="header-content">
        <h4>
          {' '}
          <Text t="communicationPreferences" />
        </h4>
      </div>

      <div className="personal-information-form">
        <Alert
          message={
            <div className="alert-message-contain">
              <CustomImage src={warning} />{' '}
              <span>
                <Text t="communicationPrefAlertMessage" />
                <br />
                <Text t="communicationPrefAlertMessage2" />
              </span>
            </div>
          }
          banner
          showIcon={false}
          className="custom-alert-warning"
          closable
        />

        <div className="personal-form communication-form">
          <CustomForm
            name="communicationPreferences"
            onFinish={onFinish}
            form={form}
            initialValues={{
              contactBySMS: currentUser?.contactBySMS,
              contactByMail: currentUser?.contactByMail,
              contactByCall: currentUser?.contactByCall,
            }}
            awaitLoading={!currentUser?.id}
            autoComplete="off"
            layout={'vertical'}
          >
            <div className="row ">
              <div className="col-md-12">
                <CustomFormItem
                  label={false}
                  name="contactBySMS"
                  className="custom-form-item"
                  valuePropName="checked"
                >
                  <CustomCheckbox>
                    <div className="checkbox-item-label">
                      <b>
                        <Text t="sms" />
                      </b>
                      <span>
                        <Text t="checkboxSMS" />
                      </span>
                    </div>
                  </CustomCheckbox>
                </CustomFormItem>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-12">
                <CustomFormItem
                  label={false}
                  name="contactByMail"
                  className="custom-form-item"
                  valuePropName="checked"
                >
                  <CustomCheckbox>
                    <div className="checkbox-item-label">
                      <b>
                        <Text t="email" />
                      </b>
                      <span>
                        <Text t="checkboxEmail" />
                      </span>
                    </div>
                  </CustomCheckbox>
                </CustomFormItem>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-12">
                <CustomFormItem
                  label={false}
                  name="contactByCall"
                  className="custom-form-item"
                  valuePropName="checked"
                >
                  <CustomCheckbox>
                    <div className="checkbox-item-label">
                      <b>
                        <Text t="phoneCall" />
                      </b>
                      <span>
                        {' '}
                        <Text t="checkboxPhone" />
                      </span>
                    </div>
                  </CustomCheckbox>
                </CustomFormItem>
              </div>
            </div>

            <CustomFormItem className="custom-form-footer">
              <CustomButton className="custom-btn-cancel" onClick={onCancel}>
                <span className="submit">
                  <Text t="cancel" />
                </span>
              </CustomButton>
              <CustomButton className="custom-btn-primary" type="primary" htmlType="submit">
                <span className="submit">
                  <Text t="saveBtn" />
                </span>
              </CustomButton>
            </CustomFormItem>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPreferences;
