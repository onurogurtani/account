import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { SmsVerification, ResetPassword, Dashboard, PaymentResult } from '../../pages';
import { LoadingImage } from '../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReduxWrapper } from '../../components/ReduxWrapper';

describe('General pages render test', () => {
  it('SmsVerification render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <SmsVerification />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('ResetPassword render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <ResetPassword />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('Dashboard render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Dashboard />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('PaymentResult render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <PaymentResult />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
});
