import React, { Suspense } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Completed from '../../../../pages/ticketRestaurant/autoUploadInstructions/Completed';
import { LoadingImage } from '../../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('Ticket restaurant autoUploadInstructions completed pages render test', () => {
  it('Completed render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Completed />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );
  });

  it('Run pdfDownload', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Completed />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => fireEvent.click(getByTestId('pdf-download')));
  });

  it('Run redirect', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <Completed />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => fireEvent.click(getByTestId('redirect')));
  });
});
