import { api } from './api';

const targetSentenceGetList = (params = {}) => {
  return api({
    url: `Mono/TargetSentence/getList`,
    method: 'POST',
    data: null,
    params,
  });
};
const targetSentenceAdd = (data) => {
  return api({
    url: `Mono/TargetSentence`,
    method: 'POST',
    data: data,
  });
};
const targetSentenceUpdate = (data) => {
  return api({
    url: `Mono/TargetSentence`,
    method: 'PUT',
    data: data,
  });
};
const targetSentenceDelete = (data) => {
  return api({
    url: `Mono/TargetSentence`,
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
