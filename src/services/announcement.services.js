import { api } from './api';

const announcementGetList = () => {
  return api({
    url: `Announcements/getList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};
// Announcements with filter
const getByFilterPagedAnnouncements = (urlString) => {
  return api({
    url: `Announcements/GetByFilterPagedAnnouncements?${urlString}`,
    method: 'POST',
  });
};

const getByFilterAnnouncementTypes = (urlString) => {
  return api({
    url: `AnnouncementType/GetByFilterPagedAnnouncementTypes?${urlString}`,
    method: 'POST',
  });
};
const addAnnouncement = (data) => {
  return api({
    url: `Announcements/Add`,
    method: 'POST',
    data,
  });
};
const createOrUpdateAnnouncementRole = (data) => {
  return api({
    url: `AnnouncementGroupss/CreateUpdateAnnouncementGroups`,
    method: 'POST',
    data,
  });
};
const editAnnouncement = (data) => {
  return api({
    url: `Announcements/Update`,
    method: 'PUT',
    data,
  });
};
const deleteAnnouncement = (data) => {
  return api({
    url: `Announcements/delete`,
    method: 'DELETE',
    data,
  });
};
const setPublishedAnnouncements = (data) => {
  return api({
    url: `Announcements/SetPublishedAnnouncements`,
    method: 'POST',
    data,
  });
};
const setUnPublishedAnnouncements = (data) => {
  return api({
    url: `Announcements/SetUnPublishedAnnouncements`,
    method: 'POST',
    data,
  });
};
const setArchiveAnnouncements = (data) => {
  return api({
    url: `Announcements/SetArchiveAnnouncements`,
    method: 'POST',
    data,
  });
};
const announcementServices = {
  announcementGetList,
  getByFilterPagedAnnouncements,
  getByFilterAnnouncementTypes ,
  addAnnouncement,
  createOrUpdateAnnouncementRole,
  editAnnouncement,
  deleteAnnouncement,
  setPublishedAnnouncements,
  setArchiveAnnouncements,
  setUnPublishedAnnouncements
};

export default announcementServices;
