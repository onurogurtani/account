import { api } from './api';

const getJobSettings = (data) => {
    return api({
        url: `Account/AppSettings/getJobSettings`,
        method: 'GET',
        data,
    });
};
const updateAppSettings = (data) => {
    return api({
        url: `Account/AppSettings`,
        method: 'PUT',
        data,
    });
};

const appSettingsServices = {
    getJobSettings,
    updateAppSettings,
};

export default appSettingsServices;
