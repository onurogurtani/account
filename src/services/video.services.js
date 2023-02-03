import { api } from './api';

const addVideo = (data) => {
  return api({
    url: `Content/Videos`,
    method: 'POST',
    data,
  });
};

const editVideo = (data) => {
  return api({
    url: `Content/Videos/updateVideo`,
    method: 'POST',
    data,
  });
};

const deleteVideoDocumentFile = (data) => {
  return api({
    url: `Shared/Files`,
    method: 'DELETE',
    data,
  });
};

const addVideoQuestionsExcel = (data) => {
  return api({
    url: `Content/Videos/uploadVideoQuestionExcel`,
    method: 'POST',
    data,
  });
};

const downloadVideoQuestionsExcel = () => {
  return api({
    url: `Content/Videos/downloadVideoQuestionExcel`,
    method: 'GET',
    responseType: 'blob',
  });
};

const getKalturaSessionKey = () => {
  return api({
    url: `Content/KalturaPlatform/getSessionKey`,
    method: 'POST',
  });
};

const getAllIntroVideoList = () => {
  return api({
    url: `Content/IntroVideos/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getAllVideoKeyword = () => {
  return api({
    url: `Content/Videos/getVideoKeyWords`,
    method: 'GET',
  });
};
const getByVideoId = (id) => {
  return api({
    url: `Content/Videos/getByVideo?Id=${id}`,
    method: 'POST',
  });
};

const getByFilterPagedVideos = (urlString = '', params = {}) => {
  return api({
    url: `Content/Videos/getByFilterPagedVideos?${urlString}`,
    method: 'POST',
    params: params,
  });
};

const deleteVideo = (id) => {
  return api({
    url: `Content/Videos?id=${id}`,
    method: 'DELETE',
  });
};

const videoServices = {
  getByFilterPagedVideos,
  addVideo,
  editVideo,
  deleteVideoDocumentFile,
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
  getKalturaSessionKey,
  getAllIntroVideoList,
  getByVideoId,
  getAllVideoKeyword,
  deleteVideo,
};

export default videoServices;
