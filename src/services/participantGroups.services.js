import { api } from './api';

// ??? güncellenicek
const getParticipantGroupsList = () => {
  return api({
    url: `ParticipantGroups/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const updateParticipantGroups = (data) => {
  return api({
    url: `Event/ParticipantGroups`,
    method: 'PUT',
    data: data,
  });
};

const createParticipantGroups = (data) => {
  return api({
    url: `Event/ParticipantGroups`,
    method: 'POST',
    data: data,
  });
};

const deleteParticipantGroups = (data) => {
  return api({
    url: `Event/ParticipantGroups?id=${data}`,
    method: 'DELETE',
    data:null
  });
};

const getParticipantGroupsPagedList = (params = {}) => {
  return api({
    url: `Event/ParticipantGroups/getPagedList`,
    method: 'POST',
    data: null,
    params: params,
  });
};

const participantGroupsServices = {
  getParticipantGroupsList,
  getParticipantGroupsPagedList,
  deleteParticipantGroups,
  createParticipantGroups,
  updateParticipantGroups
};

export default participantGroupsServices;
