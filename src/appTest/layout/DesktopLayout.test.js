import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import DesktopLayout from '../../layout/DesktopLayout';
import { LoadingImage } from '../../components';
import { Router } from 'react-router-dom';

describe('DesktopLayout tests', () => {
  const history = createMemoryHistory();
  it('Desktop layout render', async () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <DesktopLayout />
        </Router>
      </Suspense>,
    );
  });
});
