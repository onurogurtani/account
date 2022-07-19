import React, { Suspense } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import AutoUploadInstructions from '../../../../pages/ticketRestaurant/autoUploadInstructions';
import { LoadingImage } from '../../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('Ticket restaurant autoUploadInstructions pages render test', () => {
  it('AtoUploadInstructions render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <AutoUploadInstructions />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => fireEvent.click(getByTestId('auto-upload-instructions')));
  });
});
