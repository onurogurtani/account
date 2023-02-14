import { api } from './api';

const getUnits = (data = null) => {
  return api({
    url: `Shared/LessonUnits/getList?PageSize=0`,
    method: 'POST',
    data,
  });
};

const maxNetNumberServices = {
  getUnits,
};

export default maxNetNumberServices;
