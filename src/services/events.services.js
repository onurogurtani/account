import { api } from './api';

const getByFilterPagedEvents = (urlString) => {
  return api({
    url: `Events/GetByFilterPagedEvents?${urlString}`,
    method: 'POST',
  });
};

const addEvent = (data) => {
  return api({
    url: `Events/Add`,
    method: 'POST',
    data,
  });
};

const getEventNames = () => {
  return api({
    url: `Events/getEventNames`,
    method: 'GET',
  });
};

const eventsServices = {
  getByFilterPagedEvents,
  addEvent,
  getEventNames,
};

export default eventsServices;
