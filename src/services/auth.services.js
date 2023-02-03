import { api } from './api';

const login = (data) => {
  return api({
    url: 'Identity/Identity/login',
    method: 'POST',
    data,
  });
};

const loginOtp = (data) => {
  return api({
    url: 'Identity/Identity/loginOtp',
    method: 'POST',
    data,
  });
};

const forgotPassword = (data) => {
  return api({
    url: 'Identity/Identity/forgotpassword',
    method: 'PUT',
    data,
  });
};

const forgotPasswordChange = (data) => {
  return api({
    url: 'Identity/Identity/forgottenpasswordchange',
    method: 'PUT',
    data,
  });
};

const getPasswordRules = () => {
  return api({
    url: 'Admin/AppSettings/getPasswordRules',
    method: 'GET',
  });
};

const reSendOtpSms = (data) => {
  return api({
    url: 'Identity/Identity/resendotpsms',
    method: 'POST',
    data,
  });
};

const forgottenPasswordTokenCheck = (data) => {
  return api({
    url: 'Identity/Identity/forgottenPasswordTokenCheck',
    method: 'PUT',
    data,
  });
};

const changeUserPassword = (data) => {
  return api({
    url: 'Identity/Identity/changeuserpassword',
    method: 'PUT',
    data,
  });
};
const behalfOfLogin = (data) => {
  return api({
    url: 'Identity/Identity/BehalfOfLogin',
    method: 'POST',
    data,
  });
};

const logout = () => {
  return api({
    url: 'Identity/Identity/logout',
    method: 'POST',
    data: {},
  });
};

const getPasswordRuleAndPeriod = () => {
  return api({
    url: 'Admin/AppSettings/GetPasswordRuleAndPeriod',
    method: 'GET',
  });
};

const setPasswordRuleAndPeriodValue = (data) => {
  return api({
    url: 'Admin/AppSettings/SetPasswordRuleAndPeriodValue',
    method: 'POST',
    data,
  });
};

const authServices = {
  login,
  loginOtp,
  reSendOtpSms,
  forgotPassword,
  forgotPasswordChange,
  getPasswordRules,
  forgottenPasswordTokenCheck,
  changeUserPassword,
  behalfOfLogin,
  logout,
  getPasswordRuleAndPeriod,
  setPasswordRuleAndPeriodValue,
};

export default authServices;
