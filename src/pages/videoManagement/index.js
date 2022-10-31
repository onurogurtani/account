import { lazy } from 'react';

const VideoList = lazy(() =>
  import('./VideoList').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AddVideo = lazy(() =>
  import('./addVideo/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const ShowVideo = lazy(() =>
  import('./showVideo/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const EditVideo = lazy(() =>
  import('./editVideo/').then(({ default: Component }) => ({
    default: Component,
  })),
);

const VideoManagement = {
  VideoList,
  AddVideo,
  ShowVideo,
  EditVideo,
};

export default VideoManagement;
