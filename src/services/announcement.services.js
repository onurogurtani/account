import { api } from './api';

const announcementGetList = () => {
  return api({
    url: `Event/Announcements/getAnnouncamentsList?PageNumber=0&PageSize=0`,
    method: 'POST',
    data: null,
  });
};
// Announcements with filter
const getByFilterPagedAnnouncements = (params) => {
  return api({
    url: `Event/Announcements/GetByFilterPagedAnnouncements`,
    method: 'POST',
    params,
  });
};

const getByFilterAnnouncementTypes = (urlString) => {
  return api({
    url: `Event/AnnouncementType/GetByFilterPagedAnnouncementTypes?${urlString}`,
    method: 'POST',
  });
};
const addAnnouncement = (data) => {
  return api({
    url: `Event/Announcements/Add`,
    method: 'POST',
    data,
  });
};
const createOrUpdateAnnouncementRole = (data) => {
  return api({
    url: `Event/AnnouncementGroups/CreateUpdateAnnouncementGroups`,
    method: 'POST',
    data,
  });
};
const editAnnouncement = (data) => {
  return api({
    url: `Event/Announcements/Update`,
    method: 'PUT',
    data,
  });
};
const deleteAnnouncement = (data) => {
  return api({
    url: `Event/Announcements/Delete`,
    method: 'DELETE',
    data,
  });
};

//kullanılmıyor
const setPublishedAnnouncements = (data) => {
  return api({
    url: `Announcements/SetPublishedAnnouncements`,
    method: 'POST',
    data,
  });
};

//kullanılmıyor
const setUnPublishedAnnouncements = (data) => {
  return api({
    url: `Announcements/SetUnPublishedAnnouncements`,
    method: 'POST',
    data,
  });
};

const setArchiveAnnouncements = (data) => {
  return api({
    url: `Event/Announcements/SetArchiveAnnouncements`,
    method: 'POST',
    data,
  });
};
const setActiveAnnouncements = (data) => {
  return api({
    url: `Event/Announcements/SetActiveAnnouncement`,
    method: 'POST',
    data,
  });
};
const announcementServices = {
  announcementGetList,
  getByFilterPagedAnnouncements,
  getByFilterAnnouncementTypes,
  addAnnouncement,
  createOrUpdateAnnouncementRole,
  editAnnouncement,
  deleteAnnouncement,
  setPublishedAnnouncements,
  setArchiveAnnouncements,
  setUnPublishedAnnouncements,
  setActiveAnnouncements,
};

export default announcementServices;
