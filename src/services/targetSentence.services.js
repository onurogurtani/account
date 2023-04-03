import { api } from './api';

const targetSentenceGetList = (params = {}) => {
    return api({
        url: `Education/TargetSentence/getList`,
        method: 'POST',
        data: null,
        params,
    });
};
const targetSentenceAdd = (data) => {
    return api({
        url: `Education/TargetSentence`,
        method: 'POST',
        data: data,
    });
};
const targetSentenceUpdate = (data) => {
    return api({
        url: `Education/TargetSentence`,
        method: 'PUT',
        data: data,
    });
};
const targetSentenceDelete = (data) => {
    return api({
        url: `Education/TargetSentence`,
        method: 'DELETE',
        data: data,
    });
};

const targetSentenceServices = {
    targetSentenceGetList,
    targetSentenceAdd,
    targetSentenceUpdate,
    targetSentenceDelete,
};

export default targetSentenceServices;
