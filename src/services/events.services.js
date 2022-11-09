import { api } from './api';

const addEvent = (data) => {
  return api({
    url: `Events/Add`,
    method: 'POST',
    data,
  });
};

const eventsServices = {
  addEvent,
};

export default eventsServices;
