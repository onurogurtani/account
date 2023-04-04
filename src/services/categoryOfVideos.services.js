import { api } from './api';

const addVideoCategory = (data) => {
    return api({
        url: `Education/CategoryOfVideos`,
        method: 'POST',
        data,
    });
};

const editVideoCategory = (data) => {
    return api({
        url: `Education/CategoryOfVideos`,
        method: 'PUT',
        data,
    });
};

const getVideoCategoryList = (data = null) => {
    return api({
        url: `Education/CategoryOfVideos/getList?PageSize=0`,
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
