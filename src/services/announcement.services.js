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
const addAnnouncement = (data) => {
  return api({
    url: `Announcements`,
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
    url: `Announcements`,
    method: 'PUT',
    data,
  });
};
const deleteAnnouncement = (id) => {
  return api({
    url: `Announcements?id=${id}`,
    method: 'DELETE',
  });
};
const setPublishedAnnouncements = (data) => {
  return api({
    url: `Announcements/SetPublishedAnnouncements`,
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
  addAnnouncement,
  createOrUpdateAnnouncementRole,
  editAnnouncement,
  deleteAnnouncement,
  setPublishedAnnouncements,
  setArchiveAnnouncements,
};

export default announcementServices;
