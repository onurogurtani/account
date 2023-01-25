import { api } from './api';

const preferencePeriodGetList = (data) => {
  return api({
    url: `Mono/PreferencePeriod/getPagedList?PageSize=50`,
    method: 'POST',
    data: null,
  });
};

const preferencePeriodAdd = (data) => {
  return api({
    url: `Mono/PreferencePeriod`,
    method: 'POST',
    data: data,
  });
};
const preferencePeriodUpdate = (data) => {
  return api({
    url: `Mono/PreferencePeriod`,
    method: 'PUT',
    data: data,
  });
};
const preferencePeriodDelete = (data) => {
  return api({
    url: `Mono/PreferencePeriod`,
    method: 'DELETE',
    params: data,
  });
};
const getEducationYears = (data = null) => {
  return api({
    url: `Mono/EducationYears/getList?PageSize=0&PageNumber=0`,
    method: 'POST',
    data,
  });
};

const preferencePeriodServices = {
  preferencePeriodGetList,
  getEducationYears,
  preferencePeriodAdd,
  preferencePeriodUpdate,
  preferencePeriodDelete,
};

export default preferencePeriodServices;
