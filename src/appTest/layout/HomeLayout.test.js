import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HomeLayout from '../../layout/HomeLayout';
import { LoadingImage } from '../../components';
import { ReduxWrapper } from '../../components/ReduxWrapper';
import { Router } from 'react-router-dom';

describe('HomeLayout tests', () => {
  const history = createMemoryHistory();
  it('Home layout render', async () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <HomeLayout />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
});
