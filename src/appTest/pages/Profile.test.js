import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LoadingImage } from '../../components';
import {
  CommunicationPreferences,
  MyProfile,
  PasswordInformation,
  PersonalInformation,
} from '../../pages';
import { Router } from 'react-router-dom';
import { ReduxWrapper } from '../../components/ReduxWrapper';

describe('/profile tests', () => {
  const history = createMemoryHistory();
  it('profile', () => {
    const route = '/profile';
    history.push(route);

    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <MyProfile />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
});

describe('profile/personal information tests', () => {
  const history = createMemoryHistory();
  it('personal information', async () => {
    const route = '/profile/personal-information';
    history.push(route);

    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <PersonalInformation />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/Kişisel Bilgiler/i)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/emin olunuz/i)).toBeInTheDocument());
  });
});

describe('profile/password-information test', () => {
  const history = createMemoryHistory();
  it('password information', async () => {
    const route = '/profile/password-information';
    history.push(route);

    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <PasswordInformation />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/Şifre Bilgileri/i)).toBeInTheDocument());
  });
});

describe('profile/communication-information test', () => {
  const history = createMemoryHistory();
  it('aaa', async () => {
    const route = '/profile/communication-information';
    history.push(route);

    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <CommunicationPreferences />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/İletişim Tercihleri/i)).toBeInTheDocument());
  });
});
