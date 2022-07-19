import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { Login, NotFound } from '../pages';
import { LoadingImage } from '../components';
import '@testing-library/jest-dom';
import { ReduxWrapper } from '../components/ReduxWrapper';

describe('App.js', () => {
  test('full app rendering/navigating', async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/ANASAYFA/i)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/GERİ DÖN/i)).toBeInTheDocument());
  });

  test('rendering a component that uses login awnd navigation forget-password', async () => {
    const history = createMemoryHistory();
    const route = '/login';
    history.push(route);

    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Login />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/Ticket Online Giriş/i)).toBeInTheDocument());
    const leftClick = { button: 0 };
    await waitFor(() => userEvent.click(getByText(/Şifremi Unuttum/i), leftClick));
    await waitFor(() => expect(getByText(/Şifremi Unuttum/i)).toBeInTheDocument());
  });
});
