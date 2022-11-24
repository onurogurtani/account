import { api } from './api';

const addVideo = (data) => {
  return api({
    url: `Videos`,
    method: 'POST',
    data,
  });
};

const editVideo = (data) => {
  return api({
    url: `Videos/updateVideo`,
    method: 'POST',
    data,
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
  return api({
    url: `/Videos/downloadVideoQuestionExcel`,
    method: 'GET',
    responseType: 'blob',
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
const getByVideoId = (id) => {
  return api({
    url: `Videos/getByVideo?Id=${id}`,
    method: 'POST',
  });
};

const getByFilterPagedVideos = (urlString) => {
  return api({
    url: `Videos/getByFilterPagedVideos?${urlString}`,
    method: 'POST',
  });
};

const deleteVideo = (id) => {
  return api({
    url: `Videos?id=${id}`,
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
