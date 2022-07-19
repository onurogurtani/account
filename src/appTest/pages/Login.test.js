import { createMemoryHistory } from 'history';
import { render, waitFor } from '@testing-library/react';
import { LoadingImage } from '../../components';
import { Router } from 'react-router-dom';
import { Login } from '../../pages';
import React, { Suspense } from 'react';
import { ReduxWrapper } from '../../components/ReduxWrapper';

test('rendering a component that uses login', async () => {
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
});
