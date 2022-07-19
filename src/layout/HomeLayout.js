import { useMediaQuery } from 'react-responsive';
import { lazy, memo, useCallback, useEffect, useState } from 'react';
import { SessionDialog } from '../components/SessionDialog';
import { loginTimeStorageKey, sessionModalMinutes } from '../utils/keys';
import dayjs from 'dayjs';
import { persistLogin } from '../utils/utils';
import { persist } from '../store/store';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { useText } from '../components';

const DesktopLayout = lazy(() =>
  import('./DesktopLayout').then(({ default: Component }) => ({
    default: Component,
  })),
);
const MobilLayout = lazy(() =>
  import('./MobilLayout').then(({ default: Component }) => ({
    default: Component,
  })),
);

const HomeLayout = ({ children }) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const ticketOnlineOrderingPlatformLanguage = useText('ticketOnlineOrderingPlatform');
  const crossTabsControl = localStorage.getItem('persist:crossTabs');

  useEffect(() => {
    if (crossTabsControl === 'true') {
      (async () => await persist.flush())();
    }
  }, [crossTabsControl]);

  const idleTimer = useIdleTimer({
    timeout: 1000 * 60 * sessionModalMinutes?.sessionMinutes,
    onIdle: () => {
      console.log('modal açıldı.');
      idleTimer?.pause();
      setVisible(true);
    },
    onActive: () => {
      console.log('hareket var');
      idleTimer?.start();
    },
    onAction: () => {
      console.log('hareket var');
      idleTimer?.start();
    },
    debounce: 250,
  });

  const headerChange = useCallback((text) => {
    document.title = 'Sanal Dershane | Admin';
  }, []);

  const modalOnResume = useCallback(() => {
    headerChange(ticketOnlineOrderingPlatformLanguage);
    idleTimer?.reset();
    setVisible(false);
    window.localStorage.setItem(loginTimeStorageKey, dayjs().toDate().toString());
  }, [idleTimer, headerChange, ticketOnlineOrderingPlatformLanguage]);

  const modalOnCancel = useCallback(() => {
    headerChange(ticketOnlineOrderingPlatformLanguage);
    setVisible(false);
    setTimeout(async () => {
      await persistLogin(dispatch, false);
    }, 1);
  }, [headerChange, ticketOnlineOrderingPlatformLanguage, dispatch]);

  const onSessionControl = useCallback(async () => {
    if (window.localStorage.getItem(loginTimeStorageKey)) {
      const time = window.localStorage.getItem(loginTimeStorageKey);
      const addMs =
        1000 * 60 * (sessionModalMinutes.sessionMinutes + sessionModalMinutes.modalMinutes);
      const loginTime = dayjs(time).add(addMs, 'millisecond');
      const currentTime = dayjs().toDate();
      const diff = loginTime.diff(currentTime);
      if (diff < 0) {
        console.log('logine atıyor...');
        await persistLogin(dispatch, false);
      } else {
        idleTimer?.reset();
        headerChange(ticketOnlineOrderingPlatformLanguage);
        console.log('başka yerde session acılmış o session devam ediyor.');
      }
    } else {
      console.log('logine atıyor...');
      await persistLogin(dispatch, false);
    }
  }, [dispatch, headerChange, idleTimer, ticketOnlineOrderingPlatformLanguage]);

  return (
    <>
      {isDesktop ? (
        <DesktopLayout collapsed={false} setCollapsed={setCollapsed} children={children} />
      ) : (
        <MobilLayout collapsed={collapsed} setCollapsed={setCollapsed} children={children} />
      )}
      {visible && (
        <SessionDialog
          visible={visible}
          setVisible={setVisible}
          onResume={modalOnResume}
          onCancel={modalOnCancel}
          onSessionControl={onSessionControl}
        />
      )}
    </>
  );
};

export default memo(HomeLayout);
