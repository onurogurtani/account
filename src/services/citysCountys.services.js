import { api } from './api';

const citysGetList = (data) => {
  return api({
    url: `Citys/getList`,
    method: 'POST',
    data,
  });
};

const countysGetList = (data) => {
  return api({
    url: `Countys/getList`,
    method: 'POST',
    data,
  });
};

const cityCountyServices = {
  citysGetList,
  countysGetList,
};

export default cityCountyServices;
