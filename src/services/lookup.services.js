import { api } from './api';

const cityGetList = () => {
  return api({
    url: `Citys/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data: {},
  });
};

const countyGetList = (cityId) => {
  return api({
    url: `Countys/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data: {
      cityId: cityId,
    },
  });
};

const neighborhoodGetList = (countyId) => {
  return api({
    url: `Neighborhoods/getList?PageNumber=1&PageSize=0`,
    method: 'POST',
    data: {
      countyId: countyId,
    },
  });
};

const lookupServices = {
  cityGetList,
  countyGetList,
  neighborhoodGetList,
};

export default lookupServices;
