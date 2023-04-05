import { api } from './api';

const getMaxNetCounts = (data = null) => {
    return api({
        url: 'Education/MaxNetCounts/GetByFilterPagedMaxNetCounts',
        method: 'POST',
        data,
    });
};
const getMaxNetCountsAdd = (data = null) => {
    return api({
        url: 'Education/MaxNetCounts/Add',
        method: 'POST',
        data,
    });
};
const getMaxNetCountsUpdate = (data = null) => {
    return api({
        url: 'Education/MaxNetCounts/Update',
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
