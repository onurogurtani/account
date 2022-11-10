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

// const ShowVideo = lazy(() =>
//   import('./showVideo/').then(({ default: Component }) => ({
//     default: Component,
//   })),
// );

// const EditVideo = lazy(() =>
//   import('./editVideo/').then(({ default: Component }) => ({
//     default: Component,
//   })),
// );

const EventManagement = {
  AddEvent,
  EventList,
  // ShowVideo,
  // EditVideo,
};

export default EventManagement;
