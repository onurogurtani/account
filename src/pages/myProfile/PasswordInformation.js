import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomInput,
  CustomPassword,
  errorDialog,
  successDialog,
  Text,
  useText,
} from '../../components';
import { useCallback, useEffect, useState } from 'react';
import formRule from '../../utils/formRule';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword, getPasswordRules } from '../../store/slice/authSlice';

const PasswordInformation = () => {
  const { currentUser } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [passwordError, setPasswordError] = useState({
    visible: false,
    messageList: [],
    isValid: false,
    errorList: [],
  });

  const getMessageList = (data) => {
    const messageList = [];
    data?.forEach((item) => {
      messageList?.push({ type: 'error', message: item?.text });
    });

    return messageList;
  };

  useEffect(() => {
    (async () => {
      const action = await dispatch(getPasswordRules());
      if (getPasswordRules.fulfilled.match(action)) {
        setPasswordError({
          visible: true,
          messageList: getMessageList(action?.payload?.data),
          isValid: false,
          errorList: action?.payload?.data,
        });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action.payload?.message,
        });
      }
    })();
  }, [dispatch]);

  const onCancel = useCallback(() => {
    form.setFieldsValue({
      userName: currentUser?.userName,
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
    });
  }, [currentUser, form]);

  const onFinish = useCallback(
    async (values) => {
      const body = {
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword,
      };

      const action = await dispatch(changeUserPassword(body));
      if (changeUserPassword.fulfilled.match(action)) {
        successDialog({
          title: <Text t="success" />,
          message: action?.payload?.message,
        });
        onCancel();
        const message = getMessageList(passwordError.errorList);
        setPasswordError({ ...passwordError, messageList: message });
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action.payload?.message,
        });
      }
    },
    [passwordError, dispatch, onCancel],
  );

  const regexErrorItemResult = (item = {}, value = '') => {
    const regex = new RegExp(item?.regExp);
    if (regex.test(value)) {
      return { listItem: { type: 'success', message: item?.text }, validation: false };
    } else {
      return { listItem: { type: 'error', message: item?.text }, validation: true };
    }
  };

  const resultErrorList = (list, value) => {
    const messageList = [];
    const validations = [];
    list?.forEach((item = { regExp: '', text: '' }) => {
      const { listItem, validation } = regexErrorItemResult(item, value);
      messageList.push(listItem);
      validations.push(validation);
    });

    return { messageList, validations };
  };

  const onChange = (e) => {
    const value = e?.target?.value;

    const { messageList, validations } = resultErrorList(passwordError.errorList, value);

    setPasswordError({
      ...passwordError,
      visible: messageList.length > 0,
      messageList,
      isValid: !validations.includes(true),
    });
  };

  return (
    <div>
      <div className="header-content">
        <h4>
          <Text t="passwordInfo" />
        </h4>
      </div>

      <div className="personal-information-form">
        <div className="personal-form">
          <CustomForm
            name="passwordInformation"
            onFinish={onFinish}
            form={form}
            initialValues={{
              userName: currentUser?.userName,
            }}
            awaitLoading={!currentUser?.id}
            autoComplete="off"
            layout={'vertical'}
          >
            <div className="row ">
              <div className="col-md-6">
                <CustomFormItem label={<Text t="loginUserName" />} name="userName">
                  <CustomInput disabled placeholder={useText('loginUserName')} maxLength={50} />
                </CustomFormItem>
              </div>

              <div className="col-md-6">
                <CustomFormItem
                  label={<Text t="currentPassword" />}
                  name="currentPassword"
                  rules={[{ required: true, message: <Text t="loginPasswordInputRequired" /> }]}
                >
                  <CustomPassword placeholder={useText('loginPasswordInput')} />
                </CustomFormItem>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-6">
                <CustomFormItem
                  label={<Text t="newPassword" />}
                  name="newPassword"
                  rules={[{ required: true, message: <Text t="loginPasswordInputRequired" /> }]}
                >
                  <CustomPassword
                    placeholder={useText('loginPasswordInputRequired')}
                    onChange={onChange}
                    autoComplete="off"
                  />
                </CustomFormItem>
              </div>

              <div className="col-md-6">
                <CustomFormItem
                  label={<Text t="againNewPassword" />}
                  name="reNewPassword"
                  rules={[
                    { required: true, message: <Text t="loginPasswordInputRequired" /> },
                    (ruleForm) =>
                      formRule.formStringMatching(
                        ruleForm,
                        'newPassword',
                        <Text t="twoPasswordDontMatch" />,
                      ),
                  ]}
                >
                  <CustomPassword placeholder={useText('againPasswordInput')} autoComplete="off" />
                </CustomFormItem>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <ul className="password-information-info">
                  <li>
                    <Text t="yourPassword" />
                  </li>
                  {passwordError.messageList?.map((item, index) => {
                    return (
                      <li
                        style={
                          item?.type === 'success' ? { color: '#689b00' } : { color: '#f72717' }
                        }
                        key={`profile-pass-error-list-${index}`}
                      >
                        {item?.message}
                      </li>
                    );
                  })}
                  <li>
                    <Text t="mustContain" />
                  </li>
                </ul>
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
                  <Text t="passwordUpdateBtn" />
                </span>
              </CustomButton>
            </CustomFormItem>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default PasswordInformation;
