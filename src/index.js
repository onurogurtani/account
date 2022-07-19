import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.less';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advanced from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/tr';
import { persist, store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { LanguageContextProvider } from './context';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advanced);
dayjs().tz('Europe/Istanbul');
dayjs.locale('tr');

ReactDOM.render(
  <LanguageContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </LanguageContextProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
