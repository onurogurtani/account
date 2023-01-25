import { api } from './api';

const addVideoCategory = (data) => {
  return api({
    url: `Content/CategoryOfVideos`,
    method: 'POST',
    data,
  });
};

const editVideoCategory = (data) => {
  return api({
    url: `Content/CategoryOfVideos`,
    method: 'PUT',
    data,
  });
};

const getVideoCategoryList = (data = null) => {
  return api({
    url: `Content/CategoryOfVideos/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const categoryOfVideosServices = {
  addVideoCategory,
  getVideoCategoryList,
  editVideoCategory,
};

export default categoryOfVideosServices;
