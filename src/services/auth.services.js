import { api } from './api';

const login = (data) => {
  return api({
    url: 'Auth/login',
    method: 'POST',
    data,
  });
};

const loginOtp = (data) => {
  return api({
    url: 'Auth/loginOtp',
    method: 'POST',
    data,
  });
};

const forgotPassword = (data) => {
  return api({
    url: 'Auth/forgotpassword',
    method: 'PUT',
    data,
  });
};

const forgotPasswordChange = (data) => {
  return api({
    url: 'Auth/forgottenpasswordchange',
    method: 'PUT',
    data,
  });
};

const getPasswordRules = () => {
  return api({
    url: 'Auth/getpasswordrules',
    method: 'GET',
  });
};

const reSendOtpSms = (data) => {
  return api({
    url: 'Auth/resendotpsms',
    method: 'POST',
    data,
  });
};

const forgottenPasswordTokenCheck = (data) => {
  return api({
    url: 'Auth/forgottenPasswordTokenCheck',
    method: 'PUT',
    data,
  });
};

const changeUserPassword = (data) => {
  return api({
    url: 'Auth/changeuserpassword',
    method: 'PUT',
    data,
  });
};
const behalfOfLogin = (data) => {
  return api({
    url: 'Auth/BehalfOfLogin',
    method: 'POST',
    data,
  });
};

const logout = () => {
  return api({
    url: 'Auth/logout',
    method: 'POST',
    data: {},
  });
};

const getPasswordRuleAndPeriod = () => {
  return api({
    url: 'AppSettings/getPasswordRuleAndPeriod',
    method: 'GET',
  })
}

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
  getPasswordRuleAndPeriod
};

export default authServices;
