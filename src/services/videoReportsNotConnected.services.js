import { api } from './api';

const getFilter = (params) => {
    return api({
        url: `/Reporting/WorkPlanUnlinkedVideos/getByFilterPaged`,
        method: 'POST',
        params,
    });
};
const getFilterDownload = (params) => {
    return api({
        url: `/Reporting/WorkPlanUnlinkedVideos/downloadFile`,
        method: 'get',
        params,
        responseType: 'blob',
    });
};

const videoReportsNotConnectedServies = {
    getFilter,
    getFilterDownload,
};

export default videoReportsNotConnectedServies;
