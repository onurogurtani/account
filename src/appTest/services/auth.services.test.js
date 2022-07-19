import authServices from '../../services/auth.services';

describe('Auth services tests', () => {
  it('login call', () => {
    authServices.login();
  });

  it('loginOtp call', () => {
    authServices.loginOtp();
  });

  it('forgotPassword call', () => {
    authServices.forgotPassword();
  });

  it('forgotPasswordChange call', () => {
    authServices.forgotPasswordChange();
  });

  it('getPasswordRules call', () => {
    authServices.getPasswordRules();
  });

  it('reSendOtpSms call', () => {
    authServices.reSendOtpSms();
  });

  it('forgottenPasswordTokenCheck call', () => {
    authServices.forgottenPasswordTokenCheck();
  });

  it('changeUserPassword call', () => {
    authServices.changeUserPassword();
  });

  it('logout call', () => {
    authServices.logout();
  });
});
