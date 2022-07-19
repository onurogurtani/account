import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomInput,
  errorDialog,
  successDialog,
  Text,
  useText,
} from '../../components';
import { Alert, Form } from 'antd';
import LoginLayout from '../../layout/LoginLayout';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReCAPTCHAKeys } from '../../utils/keys';
import { useCallback, useEffect, useRef, useState } from 'react';
import warning from '../../assets/icons/icon-profil-warning.svg';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/slice/authSlice';
import '../../styles/login/forgotPassword.scss';

const ForgotPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const loginUsernameInput = useText('loginUsernameInput');
  const recaptchaRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const paramError = params?.get('error');
    if (paramError === 'true') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, []);

  const onFinish = useCallback(
    async (values) => {
      const body = {
        ...values,
        isAdmin: 0,
      };

      const action = await dispatch(forgotPassword(body));
      if (forgotPassword.fulfilled.match(action)) {
        successDialog({
          title: <Text t="successfullySent" />,
          message: action?.payload?.message,
          onOk: () => {
            history.push('/login');
          },
        });
      } else {
        recaptchaRef.current.reset();
        form.resetFields(['captchaKey']);
        if (action?.payload?.message === '1') {
          setVisible(true);
        } else {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
        }
      }
    },
    [dispatch, history, form],
  );

  return (
    <LoginLayout isBackButton={true} className={'forgotPassword'}>
      <div className="rightSideLoginFormTitle">
        {isError ? <Text t="resetPassword" /> : <Text t="forgotPassword" />}
      </div>

      {isError && (
        <>
          <p className="info-text">
            <Text t="forgotPasswordErrorMessage" />
          </p>

          <Alert
            message={
              <div className="alert-message-contain">
                <CustomImage src={warning} />
                <span>
                  <Text t="badPasswordResetLinkMessage" />
                </span>
              </div>
            }
            banner
            showIcon={false}
            className="custom-alert-error"
          />
        </>
      )}

      <CustomForm
        name="forgotPassword"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
        <CustomFormItem
          label={<Text t="emailAdress" />}
          name="email"
          rules={[{ required: true, message: <Text t="checkEposta" /> }]}
        >
          <CustomInput placeholder={useText('enterEposta')} />
        </CustomFormItem>

        {isVisible && (
          <CustomFormItem
            label={<Text t="loginUserName" />}
            name="userName"
            rules={[
              {
                required: true,
                message: <Text t="loginUsernameInputRequired" />,
              },
            ]}
          >
            <CustomInput placeholder={loginUsernameInput} />
          </CustomFormItem>
        )}

        <CustomFormItem>
          <CustomButton type="primary" htmlType="submit" style={{ width: '100%' }}>
            <span className="submit">
              <Text t="sendMyPassBtn" />
            </span>
          </CustomButton>
        </CustomFormItem>
      </CustomForm>
    </LoginLayout>
  );
};

export default ForgotPassword;
