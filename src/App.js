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
  ResetPassword,
  SmsVerification,
} from './pages';

import { ApiProvider, LoadingImage } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { api } from './services/api';
import { getCurrentUser } from './store/slice/userSlice';
import HomeLayout from './layout/HomeLayout';

import UserManagement from './pages/userManagement';
import VideoManagement from './pages/videoManagement';
import Settings from './pages/settings';

import EventManagement from './pages/eventManagement';
import UserListManagement from './pages/userManagement/userListManagement';
import AdminUsersManagement from './pages/userManagement/adminUsersManagement';

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
  }, [store?.token]);

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

              <HomeLayout>
                <PrivateRoute exact path={'/'} Component={Dashboard} authority="dashboard" />
                <PrivateRoute exact path={'/dashboard'} Component={Dashboard} authority="dashboard" />
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
                          path={`${match?.path}/survey-management/add`}
                          Component={UserManagement?.AddForm}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/survey-management`}
                          Component={UserManagement?.SurveyManagement}
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
                        <PrivateRoute
                          path={`${match?.path}/user-list-management`}
                          authority="dashboard"
                          Component={({ match }) => {
                            return (
                              <Switch>
                                <PrivateRoute
                                  path={`${match?.path}/list`}
                                  Component={UserListManagement.UserList}
                                  exact
                                  authority="dashboard"
                                />
                                <PrivateRoute
                                  path={`${match?.path}/add`}
                                  exact
                                  Component={UserListManagement?.UserCreate}
                                  authority="dashboard"
                                />
                                <PrivateRoute
                                  path={`${match?.path}/edit/:id`}
                                  exact
                                  Component={UserListManagement?.UserCreate}
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
                        />

                        <PrivateRoute
                          path={`${match?.path}/avatar-management`}
                          Component={UserManagement?.AvatarManagement}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/school-management`}
                          Component={UserManagement?.SchoolManagement}
                          authority="dashboard"
                        />

                        <PrivateRoute
                          path={`${match?.path}/announcement-management`}
                          Component={UserManagement?.AnnouncementManagement}
                          authority="dashboard"
                          exact
                        />
                        <PrivateRoute
                          path={`${match?.path}/announcement-management/add`}
                          Component={UserManagement?.AddAnnouncement}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/announcement-management/show`}
                          Component={UserManagement?.ShowAnnouncement}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/announcement-management/edit`}
                          Component={UserManagement?.EditAnnouncement}
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
                <PrivateRoute
                  path={'/video-management'}
                  Component={({ match }) => {
                    return (
                      <Switch>
                        <PrivateRoute
                          path={`${match?.path}/list`}
                          Component={VideoManagement?.VideoList}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/add`}
                          Component={VideoManagement?.AddVideo}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/show/:id`}
                          Component={VideoManagement?.ShowVideo}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/edit/:id`}
                          Component={VideoManagement?.EditVideo}
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
                <PrivateRoute
                  path={'/event-management'}
                  Component={({ match }) => {
                    return (
                      <Switch>
                        <PrivateRoute
                          path={`${match?.path}/list`}
                          Component={EventManagement?.EventList}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/add`}
                          Component={EventManagement?.AddEvent}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/show/:id`}
                          Component={EventManagement?.ShowEvent}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/edit/:id`}
                          Component={EventManagement?.EditEvent}
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
                <PrivateRoute
                  path={'/settings'}
                  Component={({ match }) => {
                    return (
                      <Switch>
                        <PrivateRoute
                          path={`${match?.path}/categories`}
                          Component={Settings?.Categories}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/packages/add`}
                          Component={Settings?.AddPackages}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/packages/edit/:id`}
                          exact
                          Component={Settings?.EditPackages}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/packages`}
                          Component={Settings?.Packages}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/lessons`}
                          Component={Settings?.Lessons}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/activities`}
                          Component={Settings?.Activities}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/classStages`}
                          Component={Settings?.ClassStages}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/announcementType`}
                          Component={Settings?.AnnouncementType}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/packagesType`}
                          Component={Settings?.PackagesType}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/academicYear`}
                          Component={Settings?.AcademicYear}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/targetSentence`}
                          Component={Settings?.TargetSentence}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/preferencePeriod`}
                          Component={Settings?.PreferencePeriod}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/targetScreen`}
                          Component={Settings?.TargetScreen}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/branch`}
                          Component={Settings?.Branch}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/publisherBook`}
                          Component={Settings?.PublisherBook}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/publisher`}
                          Component={Settings?.Publisher}
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
                <PrivateRoute
                  path={'/admin-users-management'}
                  Component={({ match }) => {
                    return (
                      <Switch>
                        <PrivateRoute
                          path={`${match?.path}/list`}
                          exact
                          Component={AdminUsersManagement?.AdminUserList}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/add`}
                          exact
                          Component={AdminUsersManagement?.AdminUserCreate}
                          authority="dashboard"
                        />
                        <PrivateRoute
                          path={`${match?.path}/edit/:id`}
                          exact
                          Component={AdminUsersManagement?.AdminUserCreate}
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

              <Route component={() => <Redirect to={{ pathname: '/not-found', state: { status: 404 } }} />} />
            </Switch>
          </BrowserRouter>
        </ApiProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export default memo(App);
