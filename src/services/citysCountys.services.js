import { api } from './api';

const citysGetList = () => {
  return api({
    url: `Citys/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const countysGetList = () => {
  return api({
    url: `Countys/getList?PageSize=0`,
    method: 'POST',
    data: null,
  });
};

const cityCountyServices = {
  citysGetList,
  countysGetList,
};

export default cityCountyServices;
