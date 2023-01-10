import { api } from './api';

const getByFilterPagedEvents = (params) => {
  return api({
    url: `Events/GetByFilterPagedEvents`,
    method: 'POST',
    params,
  });
};

const getByEventId = (id) => {
  return api({
    url: `Events/getById?Id=${id}`,
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

const editEvent = (data) => {
  return api({
    url: `/Events/Update`,
    method: 'PUT',
    data,
  });
};

const deleteEvent = (data) => {
  return api({
    url: `Events/Delete`,
    method: 'DELETE',
    data,
  });
};

const getAllEventsKeyword = () => {
  return api({
    url: `Events/getEventKeyWords`,
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
