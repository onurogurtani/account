import { api } from './api';

const getMaxNetCounts = (data = null) => {
    return api({
        url: 'Target/MaxNetCounts/GetByFilterPagedMaxNetCounts',
        method: 'POST',
        data,
    });
};
const getMaxNetCountsAdd = (data = null) => {
    return api({
        url: 'Target/MaxNetCounts/Add',
        method: 'POST',
        data,
    });
};
const getMaxNetCountsUpdate = (data = null) => {
    return api({
        url: 'Target/MaxNetCounts/Update',
        method: 'PUT',
        data,
    });
};
const maxNetNumberServices = {
    getMaxNetCounts,
    getMaxNetCountsAdd,
    getMaxNetCountsUpdate,
};

export default maxNetNumberServices;
