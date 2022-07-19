import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { LoadingImage } from '../../components';
import Headers from '../../components/header';
import { Router } from 'react-router-dom';
import { ReduxWrapper } from '../../components/ReduxWrapper';

describe('responsive header test', () => {
  const history = createMemoryHistory();
  const route = '/dashboard';
  history.push(route);

  test('rendering mobile header', async () => {
    const { getByAltText, getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Headers isDesktop={false} />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    const searchMobile = getByAltText('search-mobile');
    const avatarMobile = getByAltText('account-mobile');

    await waitFor(() => expect(searchMobile.src).toContain('icon-mobile-search'));
    await waitFor(() => userEvent.click(avatarMobile));
    await waitFor(() => expect(getByText(/Güvenli Çıkış/i)).toBeInTheDocument());
  });

  test('rendering desktop header', async () => {
    const { getByText, getByAltText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Headers isDesktop={true} />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    const accountDesktop = getByAltText('account-desktop');

    await waitFor(() => expect(getByText(/Sipariş Ver/i)).toBeInTheDocument());
    await waitFor(() => userEvent.click(accountDesktop));
    await waitFor(() => expect(getByText(/Güvenli Çıkış/i)).toBeInTheDocument());
  });
});
