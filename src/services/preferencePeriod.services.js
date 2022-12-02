import { api } from './api';

const preferencePeriodGetList = (data) => {
  return api({
    url: `PreferencePeriod/getList?PageSize=20`,
    method: 'POST',
    data: null,
  });
};

const preferencePeriodAdd = (data) => {
  return api({
    url: `PreferencePeriod`,
    method: 'POST',
    data: data,
  });
};
const preferencePeriodUpdate = (data) => {
  return api({
    url: `PreferencePeriod`,
    method: 'PUT',
    data: data,
  });
};
const getEducationYears = (data) => {
  return api({
    url: `EducationYears/getList?PageSize=20`,
    method: 'POST',
    data: null,
  });
};

const preferencePeriodServices = {
  preferencePeriodGetList,
  getEducationYears,
  preferencePeriodAdd,
  preferencePeriodUpdate,
};

export default preferencePeriodServices;
