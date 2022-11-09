import { lazy } from 'react';

// const VideoList = lazy(() =>
//   import('./VideoList').then(({ default: Component }) => ({
//     default: Component,
//   })),
// );

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
  // VideoList,
  // ShowVideo,
  // EditVideo,
};

export default EventManagement;
