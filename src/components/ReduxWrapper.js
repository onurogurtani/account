import { Provider } from 'react-redux';
import { persist, store } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';

export const ReduxWrapper = ({ children }) => (
  <Provider store={store}>
    <PersistGate loa ding={null} persistor={persist}>
      {children}
    </PersistGate>
  </Provider>
);
