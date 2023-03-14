import { api } from './api';

const getJobSettings = (data) => {
    return api({
        url: `Admin/AppSettings/getJobSettings`,
        method: 'GET',
        data,
    });
};
const updateAppSettings = (data) => {
    return api({
        url: `Admin/AppSettings`,
        method: 'PUT',
        data,
    });
};

const appSettingsServices = {
    getJobSettings,
    updateAppSettings,
};

export default appSettingsServices;
