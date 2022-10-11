import { lazy } from 'react';

const VideoList = lazy(() =>
  import('./VideoList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AddVideo = lazy(() =>
  import('./AddVideo').then(({ default: Component }) => ({
    default: Component,
  })),
);

const VideoManagement = {
  VideoList,
  AddVideo,
};

export default VideoManagement;
