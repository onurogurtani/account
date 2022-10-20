import axios from 'axios';
let ks =
  'M2MzOGM1ODE2OGEzYmNjZjg2NTE4ZjY3NDI3OGVkODk1NmY3NDZmN3wxMjU7MTI1OzE2NjYzMDI1MDc7MDsxNjY2MjE2MTA3LjAzMjk7Ozs7';

const getUploadToken = (kalturaSessionKey) => {
  return axios({
    url: `${process.env.KALTURA_URL}/uploadtoken/action/add?ks=${kalturaSessionKey}&format=1`,
    method: 'GET',
  });
};
const newEntryKaltura = (data, kalturaSessionKey) => {
  return axios({
    url: `${process.env.KALTURA_URL}/media/action/add?ks=${ks}&format=1`,
    method: 'POST',
    data,
  });
};

const kalturaServices = {
  getUploadToken,
  newEntryKaltura,
};

export default kalturaServices;
