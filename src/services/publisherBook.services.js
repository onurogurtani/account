import { api } from './api';
const getPublisherBookList = (params = {}) => {
    return api({
        url: 'Exam/Books/getByFilterPagedBooks',
        method: 'POST',
        data: null,
        params: params,
    });
};
const getPublisherBookAdd = (data) => {
    return api({
        url: 'Exam/Books/AddRange',
        method: 'POST',
        data: data,
    });
};
const getPublisherBookUpdate = (data) => {
    return api({
        url: 'Exam/Books',
        method: 'PUT',
        data: data,
    });
};

const publisherServices = {
    getPublisherBookList,
    getPublisherBookAdd,
    getPublisherBookUpdate,
};

export default publisherServices;
