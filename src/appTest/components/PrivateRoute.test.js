import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { LoadingImage } from '../../components';
import Headers from '../../components/header';
import { ReduxWrapper } from '../../components/ReduxWrapper';

describe('Private route component test', () => {
  it('header notif', async () => {
    const { getByText } = render(
      <Suspense fallback={<LoadingImage />}>
        <Headers isDesktop={true} />
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByText(/2/i)).toBeInTheDocument());
  });
});
