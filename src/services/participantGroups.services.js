import { api } from './api';

// ??? güncellenicek
const getParticipantGroupsList = () => {
  return api({
    url: `ParticipantGroups/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const participantGroupsServices = {
  getParticipantGroupsList,
};

export default participantGroupsServices;
