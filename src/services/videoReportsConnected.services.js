import { api } from './api';

const getFilter = (params) => {
    return api({
        url: `/Reporting/WorkPlanLinkedVideos/GetFilterPageWorkPlanLinkedVideos`,
        method: 'POST',
        params,
    });
};
const getFilterDownload = (params) => {
    return api({
        url: `/Reporting/WorkPlanLinkedVideos/downloadFile`,
        method: 'get',
        params,
        responseType: 'blob',
    });
};

const videoReportsConnectedServies = {
    getFilter,
    getFilterDownload,
};

export default videoReportsConnectedServies;
