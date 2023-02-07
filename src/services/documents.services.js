import { api } from './api';

const getListDocuments = () => {
  return api({
    url: 'Crm/Documents/getList',
    method: 'POST',
    data: [],
  });
};

const documentsServices = {
  getListDocuments,
};

export default documentsServices;
