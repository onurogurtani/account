import { api } from './api';

const addVideo = (data) => {
    return api({
        url: `Education/Videos`,
        method: 'POST',
        data,
    });
};

const editVideo = (data) => {
    return api({
        url: `Education/Videos/updateVideo`,
        method: 'POST',
        data,
    });
};

const deleteVideoDocumentFile = (data) => {
    return api({
        url: `Shared/Files`,
        method: 'DELETE',
        data,
    });
};

const addVideoQuestionsExcel = (data) => {
    return api({
        url: `Education/Videos/uploadVideoQuestionExcel`,
        method: 'POST',
        data,
    });
};

const downloadVideoQuestionsExcel = () => {
    return api({
        url: `Education/Videos/downloadVideoQuestionExcel`,
        method: 'GET',
        responseType: 'blob',
    });
};

const getKalturaSessionKey = () => {
    return api({
        url: `Education/KalturaPlatform/getSessionKey`,
        method: 'POST',
    });
};

const getAllIntroVideoList = () => {
    return api({
        url: `Education/IntroVideos/getList?PageSize=0`,
        method: 'POST',
        data: null,
    });
};

const getAllVideoKeyword = () => {
    return api({
        url: `Education/Videos/getVideoKeyWords`,
        method: 'GET',
    });
};
const getByVideoId = (id) => {
    return api({
        url: `Education/Videos/getByVideo?Id=${id}`,
        method: 'POST',
    });
};

const getByFilterPagedVideos = (urlString = '', params = {}) => {
    return api({
        url: `Education/Videos/getByFilterPagedVideos?${urlString}`,
        method: 'POST',
        params: params,
    });
};

const deleteVideo = (id) => {
    return api({
        url: `Education/Videos?id=${id}`,
        method: 'DELETE',
    });
};

const videoServices = {
    getByFilterPagedVideos,
    addVideo,
    editVideo,
    deleteVideoDocumentFile,
    addVideoQuestionsExcel,
    downloadVideoQuestionsExcel,
    getKalturaSessionKey,
    getAllIntroVideoList,
    getByVideoId,
    getAllVideoKeyword,
    deleteVideo,
};

export default videoServices;
