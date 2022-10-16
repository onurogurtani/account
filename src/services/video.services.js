import { api } from './api';

const addVideoCategory = (data) => {
  return api({
    url: `VideoCategorys`,
    method: 'POST',
    data,
  });
};

const getVideoCategoryList = () => {
  return api({
    url: `VideoCategorys/getList`,
    method: 'POST',
  });
};

const deleteVideoDocumentFile = (data) => {
  return api({
    url: `/Files`,
    method: 'DELETE',
    data,
  });
};

const addVideoQuestionsExcel = (data) => {
  return api({
    url: `/Videos/uploadVideoQuestionExcel`,
    method: 'POST',
    data,
  });
};

const downloadVideoQuestionsExcel = () => {
  const headers = { 'Content-Type': 'blob' };
  return api({
    url: `/Videos/downloadVideoQuestionExcel`,
    method: 'GET',
    responseType: 'arraybuffer',
    headers,
  });
};

const getKalturaSessionKey = () => {
  return api({
    url: `KalturaPlatform/getSessionKey`,
    method: 'POST',
  });
};

const videoServices = {
  addVideoCategory,
  getVideoCategoryList,
  deleteVideoDocumentFile,
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
  getKalturaSessionKey,
};

export default videoServices;
