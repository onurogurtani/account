import { api } from './api';

const addImage = (data) => {
  return api({
    url: `Member/AvatarFiles`,
    method: 'POST',
    data,
  });
};

const getAllImages = () => {
  return api({
    url: `Member/AvatarFiles/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const getImage = ({ id }) => {
  return api({
    url: `Member/AvatarFiles/getbyid?id=${id}`,
    method: 'GET',
  });
};

const deleteImage = (data) => {
  return api({
    url: `Member/AvatarFiles`,
    method: 'DELETE',
    data,
  });
};

const avatarFilesServices = {
  addImage,
  getImage,
  deleteImage,
  getAllImages,
};

export default avatarFilesServices;
