import { api } from './api';

const getAppSettings = (data) => {
  return api({
    url: 'AppSettings/getAppSetting',
    method: 'POST',
    data,
  });
};

const appSettingsServices = {
  getAppSettings,
};

export default appSettingsServices;
