import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomPassword,
  errorDialog,
  CustomImage,
  Text,
  useText,
  CustomNumberInput,
} from '../../components';
import { Form } from 'antd';
import LoginLayout from '../../layout/LoginLayout';
import '../../styles/login/login.scss';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slice/authSlice';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReCAPTCHAKeys } from '../../utils/keys';
import fastLoginImg from '../../assets/images/login/fastLoginImg.png';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state?.auth);
  const recaptchaRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [history, token]);

  const onFinish = useCallback(
    async (values) => {
      const body = {
        citizenId: values?.citizenId,
        password: values?.password,
        captchaKey: values?.captchaKey,
      };
      const action = await dispatch(login(body));
      if (login.fulfilled.match(action)) {
        history?.push('/sms-verification');
      } else {
        form.resetFields(['captchaKey']);
        errorDialog({
          title: <Text t="error" />,
          message: action.payload?.message,
        });
      }
    },
    [dispatch, form, history],
  );

  return (
    <LoginLayout isBackButton={false} className="login">
      <div className="rightSideLoginFormTitle">
        <Text t="Dijital Dershane | Admin Panel" />
      </div>
      <CustomForm
        name="login"
        form={form}
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
        <CustomFormItem
          label={<Text t="T.C. Kimlik No" />}
          name="citizenId"
          rules={[
            { required: true, message: 'Lütfen T.C. kimlik no bilginizi giriniz.' },
            { type: 'number', min: 10000000000, message: '11 karakter olmalı' },
          ]}
        >
          <CustomNumberInput height="58" maxlength="11" placeholder="T.C. Kimlik No Girinizı" />
        </CustomFormItem>

        <CustomFormItem
          label={<Text t="loginPassword" />}
          name="password"
          rules={[
            {
              required: true,
              message: <Text t="loginPasswordInputRequired" />,
            },
          ]}
        >
          <CustomPassword placeholder={useText('loginPasswordInput')} />
        </CustomFormItem>

        <CustomFormItem>
          <CustomButton height="58" type="primary" htmlType="submit" style={{ width: '100%' }}>
            <span className="submit">
              <Text t="loginBtn" />
            </span>
          </CustomButton>
        </CustomFormItem>

        <div className="fastLogin">
          <CustomButton type="link" onClick={() => console.log('Hızlı Giriş')}>
            <CustomImage src={fastLoginImg} />
          </CustomButton>
        </div>

        <CustomFormItem
          label={false}
          name="captchaKey"
          rules={[{ required: true, message: <Text t="recaptchaVerification" /> }]}
        >
          <ReCAPTCHA
            className="re-captcha"
            sitekey={ReCAPTCHAKeys}
            ref={(current) => (recaptchaRef.current = current)}
          />
        </CustomFormItem>
      </CustomForm>
    </LoginLayout>
  );
};

export default Login;
