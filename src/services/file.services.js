import { api } from './api';
import axios from 'axios';

const downloadFile = (id) => {
  return api({
    url: `/Files/getbyid?id=${id}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const uploadFile = (data, options) => {
  return axios.post(`${process.env.PUBLIC_HOST_API}/Files`, data, { ...options });
};

const fileServices = {
  downloadFile,
  uploadFile,
};

export default fileServices;
