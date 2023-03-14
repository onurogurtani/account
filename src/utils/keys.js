export const ReCAPTCHAKeys = '6Lfzgv0kAAAAAP3SFw-N4rhMgWIiz1c9h2RBy3Xe';
export const footerLink = {
    help: '/',
    communication: 'https://www.dd.com.tr/iletisim',
    protectionOfPersonalData: 'https://www.dd.com.tr/kisisel-verilerin-korunmasi',
    cookiePolicy: 'https://www.dd.com.tr/cerez-politikasi',
    facebook: '/',
    instagram: '/',
    linkedin: '/',
    youtube: '/',
    twitter: '/',
};

export const sessionModalMinutes = {
    modalMinutes: 2,
    sessionMinutes: process.env.SESSION_MINUTES || 3000,
};
export const endUserPageUrl = process.env.END_USER_PAGE;
export const endUserPageBehalfOfLoginUrl = endUserPageUrl + 'behalfOfLogin';

export const loginTimeStorageKey = 'login-time';
export const languageStorageKey = 'language';
export const profileAlertKey = 'profile-alert';

export const dateFormat = 'DD MMMM YYYY';
export const defaultDateFormat = 'DD.MM.YYYY';
export const dateTimeFormat = 'DD.MM.YYYY HH:mm';
