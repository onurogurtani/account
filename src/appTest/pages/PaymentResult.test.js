import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { LoadingImage } from '../../components';
import { Router } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ReduxWrapper } from '../../components';
import PaymentResult from '../../pages/PaymentResult';

test('PaymentResult page render test', async () => {
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
