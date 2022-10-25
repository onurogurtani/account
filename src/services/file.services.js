import { api } from './api';

const downloadFile = (id) => {
  return api({
    url: `/Files/getbyid?id=${id}`,
    method: 'GET',
    responseType: 'blob',
  });
};

const fileServices = {
  downloadFile,
};

export default fileServices;
