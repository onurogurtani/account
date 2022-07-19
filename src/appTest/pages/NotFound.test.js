import React, { Suspense } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LoadingImage } from '../../components';
import { NotFound } from '../../pages';
import { Router } from 'react-router-dom';

describe('/notfound tests', () => {
  it('notfound', async () => {
    const history = createMemoryHistory();
    const route = '/not-found';
    history.push(route);

    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <NotFound />
        </Router>
      </Suspense>,
    );

    await waitFor(() => {
      const back = getByTestId('back-button');
      fireEvent.click(back);
    });

    await waitFor(() => {
      const home = getByTestId('home-button');
      fireEvent.click(home);
    });
  });
});
