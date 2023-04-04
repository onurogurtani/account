import { api } from './api';

const login = (data) => {
    return api({
        url: 'Account/Identity/login',
        method: 'POST',
        data,
    });
};

const loginOtp = (data) => {
    return api({
        url: 'Account/Identity/loginOtp',
        method: 'POST',
        data,
    });
};

const forgotPassword = (data) => {
    return api({
        url: 'Account/Identity/forgotpassword',
        method: 'PUT',
        data,
    });
};

const forgotPasswordChange = (data) => {
    return api({
        url: 'Account/Identity/forgottenpasswordchange',
        method: 'PUT',
        data,
    });
};

const getPasswordRules = () => {
    return api({
        url: 'Account/AppSettings/getPasswordRules',
        method: 'GET',
    });
};

const reSendOtpSms = (data) => {
    return api({
        url: 'Account/Identity/resendotpsms',
        method: 'POST',
        data,
    });
};

const forgottenPasswordTokenCheck = (data) => {
    return api({
        url: 'Account/Identity/forgottenPasswordTokenCheck',
        method: 'PUT',
        data,
    });
};

const changeUserPassword = (data) => {
    return api({
        url: 'Account/Identity/changeuserpassword',
        method: 'PUT',
        data,
    });
};
const behalfOfLogin = (data) => {
    return api({
        url: 'Account/Identity/BehalfOfLogin',
        method: 'POST',
        data,
    });
};

const logout = () => {
    return api({
        url: 'Account/Identity/logout',
        method: 'POST',
        data: {},
    });
};

const getPasswordRuleAndPeriod = () => {
    return api({
        url: 'Account/AppSettings/GetPasswordRuleAndPeriod',
        method: 'GET',
    });
};

const setPasswordRuleAndPeriodValue = (data) => {
    return api({
        url: 'Account/AppSettings/SetPasswordRuleAndPeriodValue',
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
