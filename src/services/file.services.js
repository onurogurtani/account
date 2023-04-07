import { api } from './api';
import axios from 'axios';

const downloadFile = (id) => {
    return api({
        url: `File/Files/getbyid?id=${id}`,
        method: 'GET',
        responseType: 'blob',
    });
};

const uploadFile = (data, options) => {
    return axios.post(`${process.env.PUBLIC_HOST_API}File/Files`, data, { ...options });
};
const uploadFileBaseApi = (data) => {
    return api({
        url: `File/Files`,
        method: 'POST',
        data,
    });
};

const deleteFile = (data) => {
    return api({
        url: `File/Files`,
        method: 'DELETE',
        data,
    });
};
const getBase64 = (data) => {
    return api({
        url: `File/Files/getBase64?id=${data.id}`,
        method: 'GET',
    });
};
const fileServices = {
    downloadFile,
    uploadFile,
    deleteFile,
    uploadFileBaseApi,
    getBase64,
};

export default fileServices;
