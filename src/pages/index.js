import { lazy } from 'react';
const Login = lazy(() => import('./login').then(({ default: Component }) => ({ default: Component })));
const ForgotPassword = lazy(() =>
  import('./forgotPassword').then(({ default: Component }) => ({ default: Component })),
);
const SmsVerification = lazy(() =>
  import('./smsVerification').then(({ default: Component }) => ({ default: Component })),
);
const ResetPassword = lazy(() => import('./resetPassword').then(({ default: Component }) => ({ default: Component })));
const NotFound = lazy(() => import('./errors/NotFound').then(({ default: Component }) => ({ default: Component })));
const Maintenance = lazy(() =>
  import('./errors/Maintenance').then(({ default: Component }) => ({ default: Component })),
);
const Dashboard = lazy(() => import('./dashboard').then(({ default: Component }) => ({ default: Component })));
const MyProfile = lazy(() => import('./myProfile').then(({ default: Component }) => ({ default: Component })));
const PersonalInformation = lazy(() =>
  import('./myProfile/PersonalInformation').then(({ default: Component }) => ({
    default: Component,
  })),
);
const PasswordInformation = lazy(() =>
  import('./myProfile/PasswordInformation').then(({ default: Component }) => ({
    default: Component,
  })),
);
const CommunicationPreferences = lazy(() =>
  import('./myProfile/CommunicationPreferences').then(({ default: Component }) => ({
    default: Component,
  })),
);

export {
  Login,
  ForgotPassword,
  SmsVerification,
  ResetPassword,
  NotFound,
  Maintenance,
  Dashboard,
  MyProfile,
  PersonalInformation,
  PasswordInformation,
  CommunicationPreferences,
};
