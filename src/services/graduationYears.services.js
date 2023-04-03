import { api } from './api';

const getGraduationYears = (data = null) => {
    return api({
        url: 'Account/GraduationYears/getList?PageSize=0',
        method: 'POST',
        data,
    });
};

const graduationYearsServices = {
    getGraduationYears,
};

export default graduationYearsServices;
