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

// const uploadTokenAddKaltura = (sessionKey) => {
//   return api({
//     // url: `/uploadtoken/action/add?ks=${sessionKey}&format=1`,
//     //TODO:Geliştirme ortamı taşınınca değiştir
//     baseURL: process.env.KALTURA_URL,
//     url: `/uploadtoken/action/add?ks=YjJmOWNlMWMyMjYxZDEzY2UwNjIzZDdjMGRhMmQ1YWM3OWMyNmNhMnwxMjU7MTI1OzE2NjYwNDAzMjY7MDsxNjY1OTUzOTI2LjMwNDk7Ozs7&format=1`,
//     method: 'GET',
//   });
// };

const videoServices = {
  addVideoCategory,
  getVideoCategoryList,
  deleteVideoDocumentFile,
  addVideoQuestionsExcel,
  downloadVideoQuestionsExcel,
  getKalturaSessionKey,
  // uploadTokenAddKaltura,
};

export default videoServices;
