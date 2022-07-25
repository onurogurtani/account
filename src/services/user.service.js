import { api } from './api';

const userGetList = (data) => {
  return api({
    url: `Users/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data,
  });
};

const userUpdate = (data) => {
  return api({
    url: `Users`,
    method: 'PUT',
    data,
  });
};

const addUser = (data) => {
  return api({
    url: `Users`,
    method: 'POST',
    data,
  });
};

const deleteUser = ({id}) => {
  return api({
    url: `Users?id=${id}`,
    method: 'DELETE',
  })
}


const userServices = {
    userGetList,
    userUpdate,
    addUser,
    deleteUser
};

export default userServices;
