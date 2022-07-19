import { api } from './api';

const getGroupsList = () => {
  return api({
    url: `Groups/getall`,
    method: 'GET',
  });
};

const getGroupClaims = ({ id }) => {
  return api({
    url: `GroupClaims/getgroupclaimsbygroupid?groupId=${id}`,
    method: 'GET',
  });
};

const addGroup = (data) => {
  return api({
    url: `Groups`,
    method: 'POST',
    data,
  });
};

const updateGroup = (data) => {
  return api({
    url: `Groups`,
    method: 'PUT',
    data,
  });
};

const deleteGroup = (data) => {
  return api({
    url: `Groups`,
    method: 'DELETE',
    data,
  });
};

const addGroupClaims = (data) => {
  return api({
    url: `GroupClaims`,
    method: 'POST',
    data,
  })
};

const deleteGroupClaims = ({id}) => {
  return api({
    url: `GroupClaims?id=${id}`,
    method: 'DELETE',
  })
}


const groupsServices = {
  getGroupsList,
  getGroupClaims,
  addGroup,
  updateGroup,
  deleteGroup,
  addGroupClaims,
  deleteGroupClaims
};

export default groupsServices;
