import { lazy, memo, Suspense, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import trTR from 'antd/lib/locale/tr_TR';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {
  Dashboard,
  ForgotPassword,
  Login,
  Maintenance,
  MyProfile,
  NotFound,
  PaymentResult,
  ResetPassword,
  SmsVerification,
} from './pages';

import { ApiProvider, LoadingImage } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './services/api';
import { getCurrentUser } from './store/slice/userSlice';
import HomeLayout from './layout/HomeLayout';

import UserManagement from './pages/userManagement';

const PrivateRoute = lazy(() =>
  import('./authentication/PrivateRoute').then(({ default: Component }) => ({
    default: Component,
  })),
);

const App = () => {
  const store = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${store?.token}` || '';
      setTimeout(async () => {
        await dispatch(getCurrentUser());
      }, 500);
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [dispatch, store?.token]);

  return (
    <Suspense fallback={<LoadingImage />}>
      <ConfigProvider locale={trTR}>
        <ApiProvider>
          <BrowserRouter basename={'/'}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/reset-password" component={ResetPassword} />
              <Route exact path="/sms-verification" component={SmsVerification} />
              <Route exact path="/not-found" component={NotFound} />
              <Route exact path="/maintenance" component={Maintenance} />
              <Route path={'/payment-result'} component={PaymentResult} />

              <HomeLayout>
                <PrivateRoute exact path={'/'} Component={Dashboard} authority="dashboard" />
                <PrivateRoute
                  exact
                  path={'/dashboard'}
                  Component={Dashboard}
                  authority="dashboard"
                />
                <PrivateRoute path={'/profile'} Component={MyProfile} authority="dashboard" />

                <PrivateRoute
                  path={'/user-management'}
                  Component={({ match }) => {
                    return (
                      <Switch>
                        <PrivateRoute
                          path={`${match?.path}/role-management`}
                          Component={UserManagement?.RoleManagement}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/operation-claims`}
                          Component={UserManagement?.OperationManagement}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/role-operation-connect`}
                          Component={UserManagement?.RoleOperationConnect}
                          authority="dashboard"
                        />
                        <Route
                          component={() => (
                            <Redirect
                              to={{
                                pathname: '/not-found',
                                state: { status: 404 },
                              }}
                            />
                          )}
                        />
                      </Switch>
                    );
                  }}
                  authority="dashboard"
                  isLayout={false}
                />
              </HomeLayout>

              <Route
                component={() => (
                  <Redirect to={{ pathname: '/not-found', state: { status: 404 } }} />
                )}
              />
            </Switch>
          </BrowserRouter>
        </ApiProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export default memo(App);
