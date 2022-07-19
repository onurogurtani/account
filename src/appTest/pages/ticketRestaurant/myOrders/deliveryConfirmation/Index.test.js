import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import Index from '../../../../../pages/ticketRestaurant/myOrders/deliveryConfirmation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';
import { LoadingImage } from '../../../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Index tests', () => {
  const history = createMemoryHistory();

  it('Index render', () => {
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Index />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });
});
