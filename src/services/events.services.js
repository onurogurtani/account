import { api } from './api';

const getByFilterPagedEvents = (params) => {
  return api({
    url: `Event/Events/GetByFilterPagedEvents`,
    method: 'POST',
    params,
  });
};

const getByEventId = (id) => {
  return api({
    url: `Event/Events/getById?Id=${id}`,
    method: 'POST',
  });
};

const addEvent = (data) => {
  return api({
    url: `Event/Events/Add`,
    method: 'POST',
    data,
  });
};

const getEventNames = () => {
  return api({
    url: `Event/Events/getEventNames`,
    method: 'GET',
  });
};

const editEvent = (data) => {
  return api({
    url: `/Event/Events/Update`,
    method: 'PUT',
    data,
  });
};

const deleteEvent = (data) => {
  return api({
    url: `Event/Events/Delete`,
    method: 'DELETE',
    data,
  });
};

const getAllEventsKeyword = () => {
  return api({
    url: `Event/Events/getEventKeyWords`,
    method: 'GET',
  });
};

const eventsServices = {
  getByFilterPagedEvents,
  addEvent,
  getEventNames,
  getByEventId,
  deleteEvent,
  editEvent,
  getAllEventsKeyword,
};

export default eventsServices;
