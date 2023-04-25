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
import WorkPlanManagement from './pages/workPlanManagement';
import AdminUsersManagement from './pages/userManagement/adminUsersManagement';
import QuestionManagement from './pages/questionManagement/index';
import AsEv from './pages/asEvTest';
import QuestionDifficultyReports from './pages/reports/questionDifficulty';
import OrganisationManagement from './pages/organisationManagement';
import Exam from './pages/exam/index';
import Reports from './pages/reports/index';
import RoleAuthorizationManagement from './pages/roleAuthorizationManagement';
import Teachers from './pages/teachers';

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
                                                    path={`${match?.path}/survey-management/add`}
                                                    Component={UserManagement?.AddForm}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/survey-management/show`}
                                                    Component={UserManagement?.ShowForm}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/survey-management`}
                                                    Component={UserManagement?.SurveyManagement}
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
                                                    path={`${match?.path}/password-management`}
                                                    Component={UserManagement?.PasswordManagement}
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
                                                    Component={Settings?.AddEditCopyPackages}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/packages/edit/:id`}
                                                    exact
                                                    Component={Settings?.AddEditCopyPackages}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/packages/copy/:id`}
                                                    exact
                                                    Component={Settings?.AddEditCopyPackages}
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
                                                <PrivateRoute
                                                    path={`${match?.path}/trialType`}
                                                    Component={Settings?.TrialType}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/participantGroups`}
                                                    Component={Settings?.ParticipantGroups}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/organisation-types`}
                                                    Component={Settings?.OrganisationTypes}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contract-types`}
                                                    Component={Settings?.ContractTypes}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contract-kinds`}
                                                    Component={Settings?.ContractKinds}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/max-net-number`}
                                                    Component={Settings?.MaxNetNumber}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contracts/show`}
                                                    exact
                                                    Component={Settings?.ShowContracts}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contracts/edit`}
                                                    exact
                                                    Component={Settings?.EditContracts}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contracts/add`}
                                                    Component={Settings?.AddContract}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/contracts`}
                                                    Component={Settings?.Contracts}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/job-settings`}
                                                    Component={Settings?.JobSettings}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/update-version-info`}
                                                    Component={Settings?.UpdateVersion}
                                                    authority="dashboard"
                                                />

                                                 <PrivateRoute
                                                    path={`${match?.path}/messages`}
                                                    Component={Settings?.Messages}
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
                                <PrivateRoute
                                    path={'/test-management/assessment-and-evaluation'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/list`}
                                                    exact
                                                    Component={AsEv?.AsEvList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/add`}
                                                    exact
                                                    Component={AsEv?.AddAsEv}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/edit`}
                                                    exact
                                                    Component={AsEv?.UpdateAsEv}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/show`}
                                                    exact
                                                    Component={AsEv?.ShowAsEv}
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
                                    path={'/question-management'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/add-question-file`}
                                                    exact
                                                    Component={QuestionManagement.AdQuestinFile}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/question-identification`}
                                                    exact
                                                    Component={QuestionManagement.QuestionIdentification}
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
                                    path={'/work-plan-management'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/list`}
                                                    Component={WorkPlanManagement.WorkPlanList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/add`}
                                                    Component={WorkPlanManagement?.AddWorkPlan}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/edit`}
                                                    Component={WorkPlanManagement?.EditWorkPlan}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/copy`}
                                                    Component={WorkPlanManagement?.CopyWorkPlan}
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
                                    path={'/organisation-management'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/list`}
                                                    exact
                                                    Component={OrganisationManagement?.OrganisationList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/show/:id`}
                                                    exact
                                                    Component={OrganisationManagement?.OrganisationShow}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/add`}
                                                    exact
                                                    Component={OrganisationManagement?.OrganisationCreateOrUpdate}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/edit/:id`}
                                                    exact
                                                    Component={OrganisationManagement?.OrganisationCreateOrUpdate}
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
                                    path={'/exam'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/trial-exam`}
                                                    exact
                                                    Component={Exam.TrialExam}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/list`}
                                                    exact
                                                    Component={Exam.TrialExamList}
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
                                    path={'/reports'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/question-difficulty/list`}
                                                    exact
                                                    Component={QuestionDifficultyReports.QuestionDifficultyList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/question-difficulty/detail`}
                                                    exact
                                                    Component={QuestionDifficultyReports.QuestionDifficultyDetail}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/video-reports`}
                                                    exact
                                                    Component={Reports.VideoReports}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/work-plan-video-reports-add-info`}
                                                    exact
                                                    Component={Reports.WorkPlanVideoReportsAdd}
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
                                    path={'/role-authorization-management'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/list`}
                                                    exact
                                                    Component={RoleAuthorizationManagement?.RoleAuthorizationList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/add`}
                                                    exact
                                                    Component={
                                                        RoleAuthorizationManagement?.RoleAuthorizationCreateOrEdit
                                                    }
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/edit/:id`}
                                                    exact
                                                    Component={
                                                        RoleAuthorizationManagement?.RoleAuthorizationCreateOrEdit
                                                    }
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
                                    path={'/teachers'}
                                    Component={({ match }) => {
                                        return (
                                            <Switch>
                                                <PrivateRoute
                                                    path={`${match?.path}/`}
                                                    exact
                                                    Component={Teachers.TeacherList}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/add`}
                                                    exact
                                                    Component={Teachers.TeacherAddEdit}
                                                    authority="dashboard"
                                                />
                                                <PrivateRoute
                                                    path={`${match?.path}/edit/:id`}
                                                    exact
                                                    Component={Teachers.TeacherAddEdit}
                                                    authority="dashboard"
                                                />
                                            </Switch>
                                        );
                                    }}
                                    authority="dashboard"
                                    isLayout={false}
                                />
                            </HomeLayout>

                            <Route
                                component={() => <Redirect to={{ pathname: '/not-found', state: { status: 404 } }} />}
                            />
                        </Switch>
                    </BrowserRouter>
                </ApiProvider>
            </ConfigProvider>
        </Suspense>
    );
};

export default memo(App);
