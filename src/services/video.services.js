import { api } from './api';

const addVideo = (data) => {
  return api({
    url: `Videos`,
    method: 'POST',
    data,
  });
};

const addVideoCategory = (data) => {
  return api({
    url: `VideoCategorys`,
    method: 'POST',
    data,
  });
};

const getVideoCategoryList = () => {
  return api({
    url: `VideoCategorys/getList?PageSize=0`,
    method: 'POST',
    data: null,
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

const getAllIntroVideoList = () => {
  return api({
    url: `IntroVideos/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getAllVideoKeyword = () => {
  return api({
    url: `Videos/getVideoKeyWords`,
    method: 'GET',
  });
};

const videoServices = {
  addVideo,
  addVideoCategory,
  getVideoCategoryList,
  deleteVideoDocumentFile,
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
  getKalturaSessionKey,
  getAllIntroVideoList,
  getAllVideoKeyword,
};

export default videoServices;
