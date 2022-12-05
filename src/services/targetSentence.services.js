import { api } from './api';

const targetSentenceGetList = () => {
  return api({
    url: `TargetSentence/getList`,
    method: 'POST',
    data: null,
  });
};
const targetSentenceAdd = (data) => {
  return api({
    url: `TargetSentence`,
    method: 'POST',
    data: data,
  });
};
const targetSentenceUpdate = (data) => {
  return api({
    url: `TargetSentence`,
    method: 'PUT',
    data: data,
  });
};

const targetSentenceServices = {
  targetSentenceGetList,
  targetSentenceAdd,
  targetSentenceUpdate,
};

export default targetSentenceServices;
