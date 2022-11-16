import { lazy } from 'react';

const EventList = lazy(() =>
  import('./EventList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AddEvent = lazy(() =>
  import('./addEvent/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const ShowEvent = lazy(() =>
  import('./showEvent/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const EditEvent = lazy(() =>
  import('./editEvent/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const EventManagement = {
  AddEvent,
  EventList,
  ShowEvent,
  EditEvent,
};

export default EventManagement;
