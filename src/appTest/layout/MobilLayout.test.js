import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import MobilLayout from '../../layout/MobilLayout';
import { LoadingImage } from '../../components';
import { ReduxWrapper } from '../../components/ReduxWrapper';
import { Router } from 'react-router-dom';

describe('MobilLayout tests', () => {
  const history = createMemoryHistory();
  it('Home layout render', async () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <MobilLayout />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
});
