import { api } from './api';

const GetByFilterPagedGroups = (params) => {
  return api({
    url: `Identity/Groups/GetByFilterPagedGroups`,
    method: 'POST',
    params,
  });
};

const getGroupsList = () => {
  return api({
    url: `Identity/Groups/getall`,
    method: 'GET',
  });
};

const getGroupClaims = ({ id }) => {
  return api({
    url: `Identity/GroupClaims/getgroupclaimsbygroupid?groupId=${id}`,
    method: 'GET',
  });
};

const addGroup = (data) => {
  return api({
    url: `Identity/Groups`,
    method: 'POST',
    data,
  });
};

const updateGroup = (data) => {
  return api({
    url: `Identity/Groups`,
    method: 'PUT',
    data,
  });
};

const deleteGroup = (data) => {
  return api({
    url: `Identity/Groups`,
    method: 'DELETE',
    data,
  });
};

const addGroupClaims = (data) => {
  return api({
    url: `Identity/GroupClaims`,
    method: 'POST',
    data,
  });
};

const deleteGroupClaims = ({ id }) => {
  return api({
    url: `Identity/GroupClaims?id=${id}`,
    method: 'DELETE',
  });
};

const groupsServices = {
  GetByFilterPagedGroups,
  getGroupsList,
  getGroupClaims,
  addGroup,
  updateGroup,
  deleteGroup,
  addGroupClaims,
  deleteGroupClaims,
};

export default groupsServices;
