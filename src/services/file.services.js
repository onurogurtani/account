import { api } from './api';
import axios from 'axios';

const downloadFile = (id) => {
  return api({
    url: `/Mono/Files/getbyid?id=${id}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const uploadFile = (data, options) => {
  return axios.post(`${process.env.PUBLIC_HOST_API}/Mono/Files`, data, { ...options });
};
const uploadFileBaseApi = (data) => {
  return api({
    url: `/Mono/Files`,
    method: 'POST',
    data,
  });
};

const deleteFile = (data) => {
  return api({
    url: `/Mono/Files`,
    method: 'DELETE',
    data,
  });
};
const fileServices = {
  downloadFile,
  uploadFile,
  deleteFile,
  uploadFileBaseApi,
};

export default fileServices;
