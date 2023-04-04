import { api } from './api';

const citysGetList = () => {
    return api({
        url: `Account/Citys/getList?PageSize=0`,
        method: 'POST',
        data: null,
    });
};

const countysGetList = () => {
    return api({
        url: `Account/Countys/getList?PageSize=0`,
        method: 'POST',
        data: null,
    });
};

const cityCountyServices = {
    citysGetList,
    countysGetList,
};

export default cityCountyServices;
