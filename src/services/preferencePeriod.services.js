import { api } from './api';

const preferencePeriodGetList = (data) => {
  return api({
    url: `PreferencePeriod/getList`,
    method: 'POST',
    data: null,
  });
};

const preferencePeriodServices = {
  preferencePeriodGetList,
};

export default preferencePeriodServices;
