import { api } from './api';

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
    data: null,
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
  getParticipantGroupsPagedList,
  deleteParticipantGroups,
  createParticipantGroups,
  updateParticipantGroups,
};

export default participantGroupsServices;
