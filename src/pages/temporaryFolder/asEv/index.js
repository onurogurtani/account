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

const AsEv = {
  AsEvList,
  ShowAsEv,
  AddAsEv,
  UpdateAsEv,
};

export default AsEv;
