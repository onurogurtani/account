import { api } from './api';

const getAnnouncementType = (data, params) => {
  return api({
    url: `AnnouncementType/GetByFilterPagedAnnouncementTypes`,
    method: 'POST',
    data,
    params,
  });
};

const addAnnouncementType = (data) => {
  return api({
    url: `AnnouncementType/Add`,
    method: 'POST',
    data,
  });
};

const updateAnnouncementType = (data) => {
  return api({
    url: `AnnouncementType/Update`,
    method: 'PUT',
    data,
  });
};

const packageServices = {
  getAnnouncementType,
  addAnnouncementType,
  updateAnnouncementType,
};

export default packageServices;
