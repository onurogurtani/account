import { api } from './api';

const getEventTypeList = (urlString) => {
  console.log(urlString);
  return api({
    url: `EventType/GetByFilterPagedEventTypes?${urlString}`,
    method: 'POST',
  });
};

const addEventType = (data) => {
  return api({
    url: 'EventType/Add',
    method: 'POST',
    data,
  });
};

const updateEventType = (data) => {
  return api({
    url: 'EventType/Update',
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
