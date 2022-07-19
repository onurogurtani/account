import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LoadingImage } from '../../components';
import { Maintenance } from '../../pages';
import { Router } from 'react-router-dom';

describe('/maintenance tests', () => {
  const history = createMemoryHistory();
  it('maintenance', async () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Maintenance />
        </Router>
      </Suspense>,
    );
  });
});
