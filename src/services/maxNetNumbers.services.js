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

const getMaxNetById = (data = null) => {
    return api({
        url: 'Education/MaxNetCounts/getbyid?Id='+data,
        method: 'GET',
        data,
    });
};

const maxNetNumberServices = {
    getMaxNetCounts,
    getMaxNetCountsAdd,
    getMaxNetCountsUpdate,
    getMaxNetById
};

export default maxNetNumberServices;
