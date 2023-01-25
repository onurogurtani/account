import { api } from './api';

const getEventTypeList = (urlString) => {
  return api({
    url: `Event/EventType/GetByFilterPagedEventTypes?${urlString}`,
    method: 'POST',
  });
};

const addEventType = (data) => {
  return api({
    url: 'Event/EventType/Add',
    method: 'POST',
    data,
  });
};

const updateEventType = (data) => {
  return api({
    url: 'Event/EventType/Update',
    method: 'PUT',
    data,
  });
};

const eventTypeServices = {
  getEventTypeList,
  addEventType,
  updateEventType,
};

export default eventTypeServices;
