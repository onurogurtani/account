import LoginLayout from '../../layout/LoginLayout';
import {
  CustomButton,
  CustomForm,
  CustomFormItem,
  CustomNumberInput,
  errorDialog,
  Text,
  useText,
} from '../../components';
import React, { useCallback, useEffect } from 'react';
import '../../styles/login/smsVerification.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginOtp, reSendOtpSms } from '../../store/slice/authSlice';
import { useTimer } from 'react-timer-hook';
import { counterFormat } from '../../utils/utils';

let didMount = true;

const SmsVerification = ({ history }) => {
  const dispatch = useDispatch();
  const { mobileLoginId, msisdn, token } = useSelector((state) => state?.auth);
  const time = new Date();
  const deadline = time.setSeconds(time.getSeconds() + 90);

  const counter = useTimer({ autoStart: false, expiryTimestamp: deadline });

  useEffect(() => {
    if (token) {
      history.push('/dashboard');
    }
  }, [history, token]);

  const handleSendSmsAgain = useCallback(async () => {
    const action = await dispatch(reSendOtpSms());
    if (reSendOtpSms.fulfilled.match(action)) {
      counter.restart(deadline);
    } else {
      counter.pause();
      errorDialog({
        title: <Text t="error" />,
        message: action.payload?.message,
        onOk: () => {
          history.push('/login');
        },
      });
    }
  }, [deadline, dispatch,history]);

  useEffect(() => {
    if (didMount) {
      didMount = false;
      if (mobileLoginId && history.location.pathname === '/sms-verification') {
        (async () => {
          if (history.action === 'PUSH') {
            counter.start();
          } else {
            try {
              await handleSendSmsAgain();
            } catch (error) {
              history.push('/login');
            }
          }
        })();
      } else {
        history.push('/login');
      }
    } else {
      counter.start();
    }
  }, [
    mobileLoginId, history, dispatch,
  ]);

  const onFinish = useCallback(
    async (values) => {
      const body = { otp: parseFloat(values?.otp) };
      const action = await dispatch(loginOtp(body));
      if (loginOtp?.fulfilled?.match(action)) {
        counter.pause();
        history.push('/dashboard');
      } else {
        errorDialog({
          title: <Text t="error" />,
          message: action?.payload?.message,
        });
      }
    },
    [counter, dispatch, history],
  );

  return (
    <LoginLayout isBackButton={true} className={'smsVerification'}>
      <div className="rightSideLoginFormTitle">
        <Text t="smsVerification" />
      </div>
      <p className="labelExplanation">
        <Text t="enterVerificationCode" />
      </p>

      <label className="labelPhone">
        <Text t="yourPhoneNumber" /> <span className="phoneValue">{msisdn}</span>
      </label>

      <CustomForm name="smsVerification" initialValues={{}} onFinish={onFinish} layout={'vertical'}>
        <CustomFormItem
          name="otp"
          rules={[
            { required: true, message: <Text t="checkSMS" /> },
            { type: 'number', min: 100000, message: <Text t="mustBe6Char" /> },
          ]}
        >
          <CustomNumberInput
            autoComplete="off"
            height="58"
            placeholder={useText('enterDigitVerifCode')}
            maxLength={6}
          />
        </CustomFormItem>

        <label className="labelRemainingTime">
          <Text t="remainingTime" />
          <span className="time">{counterFormat(counter)}</span>
          <span className={`sendAgain`} onClick={() => handleSendSmsAgain()}>
            <Text t="sendSmsAgain" />
          </span>
        </label>

        <CustomFormItem>
          <CustomButton height="58" type="primary" htmlType="submit" style={{ width: '100%' }}>
            <span className="submit">
              <Text t="loginBtn" />
            </span>
          </CustomButton>
        </CustomFormItem>
      </CustomForm>
    </LoginLayout>
  );
};

export default SmsVerification;
