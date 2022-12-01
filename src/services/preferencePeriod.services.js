import { api } from './api';

const getEducationYearList = ({}) => {
  return api({
    url: `EducationYear/getList?PageNumber=0`,
    method: 'POST',
    data: null,
  });
};
const getEducationYearAdd = ({ data }) => {
  return api({
    url: `EducationYear`,
    method: 'POST',
    data: data,
  });
};
const getEducationYearUpdate = ({ data }) => {
  return api({
    url: `EducationYear`,
    method: 'PUT',
    data: data,
  });
};

const prefencePeriodServices = {
  getEducationYearList,
  getEducationYearAdd,
};

export default prefencePeriodServices;
