import { api } from './api';

const getVersionList = () => {
    return api({
        url: `Education/YokSyncVersion/GetVersionList`,
        method: 'GET',
    });
};

const getYksLicenceDataChanges = (data) => {
    return api({
        url: `Education/YokSyncVersion/GetYksLicenceDataChangesById`,
        method: 'POST',
        data,
    });
};
const getYksAscDataChanges = (data) => {
    return api({
        url: `Education/YokSyncVersion/GetYksAssociateDegreeDataChangesById`,
        method: 'POST',
        data,
    });
};
const getLgsDataChanges = (data) => {
    return api({
        url: `Education/YokSyncVersion/GetLgsDataChangesById`,
        method: 'POST',
        data,
    });
};

const loadLgsDataChanges = (data) => {
    return api({
        url: `Education/LgsPreferenceSchoolRaws/LoadDataFromPdfPreferenceSchoolRaws`,
        method: 'POST',
        data,
    });
};

const syncYksLicencePrefs = () => {
    return api({
        url: `Education/YokAtlas/SyncYksLicencePreferences`,
        method: 'GET',
    });
};
const syncYksAscPrefs = () => {
    return api({
        url: `Education/YokAtlas/SyncYksAssociateDegreePreferences`,
        method: 'GET',
    });
};

const yokSyncVersionService = {
    getVersionList,
    getYksLicenceDataChanges,
    getYksAscDataChanges,
    getLgsDataChanges,
    loadLgsDataChanges,
    syncYksLicencePrefs,
    syncYksAscPrefs,
};

export default yokSyncVersionService;
