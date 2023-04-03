import { api } from './api';

const getFilter = (data) => {
    return api({
        url: `Reporting/WorkPlanLinkedVideos/GetFilterPageWorkPlanLinkedVideos`,
        method: 'POST',
        data,
    });
};
const getFilterDownload = (data) => {
    return api({
        url: `Reporting/WorkPlanLinkedVideos/downloadFile`,
        method: 'POST',
        data,
        responseType: 'blob',
    });
};

const videoReportsConnectedServies = {
    getFilter,
    getFilterDownload,
};

export default videoReportsConnectedServies;
