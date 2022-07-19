import {
  login,
  loginOtp,
  reSendOtpSms,
  forgotPasswordChange,
  forgotPassword,
  getPasswordRules,
  changeUserPassword,
  forgottenPasswordTokenCheck,
  logout,
} from '../../../store/slice/authSlice';
import { store } from '../../../store/store';

describe('Auth slice tests', () => {
  it('login call', () => {
    store.dispatch(login());
  });

  it('login otp call', () => {
    store.dispatch(loginOtp());
  });

  it('reSendOtpSms call', () => {
    store.dispatch(reSendOtpSms());
  });

  it('forgotPasswordChange call', () => {
    store.dispatch(forgotPasswordChange());
  });

  it('forgotPassword call', () => {
    store.dispatch(forgotPassword());
  });

  it('getPasswordRules call', () => {
    store.dispatch(getPasswordRules());
  });

  it('changeUserPassword call', () => {
    store.dispatch(changeUserPassword());
  });

  it('forgottenPasswordTokenCheck call', () => {
    store.dispatch(forgottenPasswordTokenCheck());
  });

  it('logout call', () => {
    store.dispatch(logout());
  });
});
