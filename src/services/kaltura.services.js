import axios from 'axios';

const getUploadToken = (kalturaSessionKey) => {
  return axios({
    url: `${process.env.KALTURA_URL}/uploadtoken/action/add?ks=${kalturaSessionKey}&format=1`,
    method: 'GET',
  });
};

const uploadFile = (
  data,
  onUploadProgress,
  cancelToken,
  kalturaSessionKey,
  introVideoUploadToken,
) => {
  return axios.post(
    `${process.env.KALTURA_URL}/uploadtoken/action/upload?ks=${kalturaSessionKey}&format=1&resume=false&finalChunk=true&resumeAt=-1&uploadTokenId=${introVideoUploadToken}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
      cancelToken,
    },
  );
};

const newEntryKaltura = (data, kalturaSessionKey) => {
  return axios({
    url: `${process.env.KALTURA_URL}/media/action/add?ks=${kalturaSessionKey}&format=1`,
    method: 'POST',
    data,
  });
};

const attachKalturaEntry = (data, kalturaSessionKey) => {
  return axios({
    url: `${process.env.KALTURA_URL}/media/action/addContent?ks=${kalturaSessionKey}&format=1`,
    method: 'POST',
    data,
  });
};

const kalturaServices = {
  getUploadToken,
  newEntryKaltura,
  uploadFile,
  attachKalturaEntry,
};

export default kalturaServices;
