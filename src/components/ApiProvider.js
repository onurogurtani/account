import { Loading } from './index';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useLang } from '../context';
import { languageOptions } from '../assets/language';
import { useDispatch } from 'react-redux';
import { persistLogin, responseJsonIgnore } from '../utils/utils';
import { errorDialog } from './CustomDialog';
import Text from './Text';

const ApiProvider = ({ children }) => {
  let count = 0;
  const [requestCount, setRequestCount] = useState(0);
  const { language } = useLang();
  const dispatch = useDispatch();

  useEffect(() => {
    api.defaults.headers.common['Content-Language'] = language || languageOptions.turkey;
  }, [language]);

  useEffect(() => {
    api?.interceptors?.request?.use(
      function (config) {
        if (!config.headers?.isWithOutLoadingBar) {
          setRequestCount((r) => r + 1);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error.response);
      },
    );

    api?.interceptors?.response?.use(
      function (response) {
        if (!response.config.headers?.isWithOutLoadingBar) {
          setRequestCount((r) => r - 1);
        }
        return responseJsonIgnore(response.data);
      },
      async function (error) {
        setRequestCount((r) => r - 1);
        if (error.response.status === 401) {
          count = 1;
          persistLogin(dispatch, true);
          setTimeout(function () {
            if (count === 1) {
              errorDialog({
                title: <Text t="error" />,
                message:
                  '2 farklı cihazdan oturumunuz açık olduğu için giriş yapamazsınız. Diğer cihazlardan oturumunuzu kapatmanız gerekmektedir.',
              });
            }
            count = 0;
          }, 1000);
        }
        return Promise.reject(error.response);
      },
    );
  }, [dispatch]);

  return <Loading spinning={requestCount > 0}>{children}</Loading>;
};

export default ApiProvider;
