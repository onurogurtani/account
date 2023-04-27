import { lazy } from 'react';

const AsEvList = lazy(() =>
  import('./AsEvList').then(({ default: Component }) => ({
    default: Component,
  })),
);
const ShowAsEv = lazy(() =>
  import('./showAsEv').then(({ default: Component }) => ({
    default: Component,
  })),
);
const AddAsEv = lazy(() =>
  import('./addAsEv').then(({ default: Component }) => ({
    default: Component,
  })),
);
const UpdateAsEv = lazy(() =>
  import('./updateAsEv').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AsEvTestPreview = lazy(() =>
  import('./AsEvTestPreview').then(({ default: Component }) => ({
    default: Component,
  })),
);

const AsEv = {
  AsEvList,
  ShowAsEv,
  AddAsEv,
  UpdateAsEv,
  AsEvTestPreview
};

export default AsEv;
