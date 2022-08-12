import { api } from './api';

const addImage = (data) => {
    return api({
        url: `AvatarFiles`,
        method: 'POST',
        data,
    });
};

const getAllImages = () => {
    return api({
        url: `AvatarFiles/getList`,
        method: 'POST',
    });
}

const getImage = ({ id }) => {
    return api({
        url: `AvatarFiles/getbyid?id=${id}`,
        method: 'GET',
    });
}

const deleteImage = (data) => {
    return api({
        url: `AvatarFiles`,
        method: 'DELETE',
        data,
    });
}

const avatarFilesServices = {
    addImage,
    getImage,
    deleteImage,
    getAllImages
};

export default avatarFilesServices;