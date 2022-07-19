import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import Menus from '../../components/Menus';
import { ReduxWrapper } from '../../components/ReduxWrapper';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { LoadingImage } from '../../components';
import userEvent from '@testing-library/user-event';

describe('custom mask input test', () => {
  it('If location is not /, /dashboard, /profile run the menuChange function with location.pathname param', () => {
    const history = createMemoryHistory();
    const route = '/login';
    history.push(route);
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Menus />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('If location is /, /dashboard, /profile run the menuChange function with null param', () => {
    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Menus />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('If click menus run mock function', async () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Menus />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    const menu = getByTestId('menus-test');
    await waitFor(() => userEvent.click(menu));
    expect(history.location.pathname).toBe('/');
  });
});
