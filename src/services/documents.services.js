import { api } from './api';

const getListDocuments = () => {
    return api({
        url: 'Account/Documents/getList',
        method: 'POST',
        data: [],
    });
};

const documentsServices = {
    getListDocuments,
};

export default documentsServices;
