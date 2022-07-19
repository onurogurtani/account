import { useCallback, useEffect, useState } from 'react';
import LoginLayout from '../../layout/LoginLayout';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomImage,
  CustomPassword,
  errorDialog,
  LoadingImage,
  Text,
  useText,
} from '../../components';
import formRule from '../../utils/formRule';
import approveIcon from '../../assets/icons/icon-reset-pass-approve.svg';
import errorIcon from '../../assets/icons/icon-reset-pass-error.svg';
import '../../styles/login/resetPassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordChange,
  forgottenPasswordTokenCheck,
  getPasswordRules,
} from '../../store/slice/authSlice';

const ResetPassword = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state?.auth);
  const loginPasswordInput = useText('loginPasswordInput');
  const enterPasswordAgain = useText('enterPasswordAgain');

  const [passwordError, setPasswordError] = useState({
    visible: false,
    messageList: [],
    isValid: false,
    errorList: [],
  });
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [history, token]);

  const passwordRules = useCallback(async () => {
    const action = await dispatch(getPasswordRules());
    if (getPasswordRules.fulfilled.match(action)) {
      const { data } = action?.payload;
      const messageList = [];
      data?.forEach((item) => {
        messageList?.push({ type: 'error', message: item?.text });
      });
      setPasswordError({ visible: true, messageList, isValid: false, errorList: data });
    } else {
      errorDialog({
        title: <Text t="error" />,
        message: action?.payload?.message,
        onOk: () => history?.push('login'),
      });
    }
  }, [dispatch, history]);

  useEffect(() => {
    const params = new URLSearchParams(window?.location?.search);
    const paramToken = params?.get('token');
    if (paramToken === null || paramToken === '') {
      history?.push('login');
    } else {
      (async () => {
        const action = await dispatch(forgottenPasswordTokenCheck({ token: paramToken }));
        if (forgottenPasswordTokenCheck.fulfilled.match(action)) {
          await passwordRules();
          setResetToken(paramToken);
        } else {
          history?.push('/forgot-password?error=true');
        }
      })();
    }
  }, [history, dispatch, passwordRules]);

  const onFinish = useCallback(
    async (values) => {
      if (passwordError.isValid) {
        const body = {
          token: resetToken,
          newPassword: values?.password,
        };
        const action = await dispatch(forgotPasswordChange(body));
        if (forgotPasswordChange.fulfilled.match(action)) {
          history?.push('/sms-verification');
        } else {
          if (
            typeof action?.payload?.message === 'string' &&
            action?.payload?.message?.includes('*Validation Error')
          ) {
            const messageList = [];
            const validations = [];
            passwordError?.errorList?.forEach((item) => {
              if (action?.payload?.indexOf(item?.text) !== -1) {
                messageList?.push({ type: 'error', message: item?.text });
                validations.push(true);
              } else {
                messageList?.push({ type: 'success', message: item?.text });
                validations.push(false);
              }
            });
            setPasswordError({
              ...passwordError,
              visible: true,
              messageList,
              isValid: !validations.includes(true),
            });
          } else {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
              onOk: () => history?.push('login'),
            });
          }
        }
      }
    },
    [passwordError, resetToken, dispatch, history],
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

  return resetToken === '' ? (
    <LoadingImage />
  ) : (
    <LoginLayout isBackButton={true} className={'resetPassword'}>
      <div className="rightSideLoginFormTitle">
        <Text t="renewPassword" />
      </div>

      <CustomForm
        name="resetPassword"
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
        layout={'vertical'}
      >
        <CustomFormItem
          label={<Text t="yourNewPassword" />}
          name="password"
          rules={[{ required: false, message: <Text t="checkPassword" /> }]}
        >
          <CustomPassword placeholder={loginPasswordInput} onChange={onChange} />
        </CustomFormItem>

        <CustomFormItem
          label={<Text t="yourAgainNewPassword" />}
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: <Text t="checkPassword" /> },
            (form) =>
              formRule.formStringMatching(form, 'password', <Text t="twoPasswordDontMatch" />),
          ]}
        >
          <CustomPassword placeholder={enterPasswordAgain} autoComplete="off" />
        </CustomFormItem>

        {passwordError.visible && (
          <div className="passwordMessageContent">
            <div className="text">
              <Text t="yourPassword" />
            </div>
            {passwordError.messageList?.map((item, index) => {
              return (
                <div key={`reset-pass-error-list-${index}`} className="passwordWarning">
                  <CustomImage
                    className="icons"
                    src={item?.type === 'error' ? errorIcon : approveIcon}
                  />
                  <span className={item?.type}>{item?.message}</span>
                </div>
              );
            })}
            <div className="text">
              <Text t="mustContain" />
            </div>
          </div>
        )}
        <CustomFormItem>
          <CustomButton type="primary" htmlType="submit" style={{ width: '100%' }}>
            <span className="submit">
              <Text t="saveBtn" />
            </span>
          </CustomButton>
        </CustomFormItem>
      </CustomForm>
    </LoginLayout>
  );
};

export default ResetPassword;
