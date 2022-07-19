import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import ticketCompliments from '../../../pages/ticketCompliments';
import { LoadingImage } from '../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('Ticket compliments pages render test', () => {
  it('CardOrders render', async () => {
    window.scrollTo = jest.fn();

    const CardOrders = ticketCompliments?.CardOrders;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <CardOrders />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('new-card-order')).toBeInTheDocument());
  });

  it('BalanceUpload render', async () => {
    window.scrollTo = jest.fn();

    const BalanceUpload = ticketCompliments?.BalanceUpload;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <BalanceUpload />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('balance-upload')).toBeInTheDocument());
  });

  it('DraftOrder render', async () => {
    window.scrollTo = jest.fn();

    const DraftOrder = ticketCompliments?.DraftOrder;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <DraftOrder />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('draft-order')).toBeInTheDocument());
  });

  it('ManageMyCards render', async () => {
    window.scrollTo = jest.fn();

    const ManageMyCards = ticketCompliments?.ManageMyCards;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <ManageMyCards />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('manage-my-cards')).toBeInTheDocument());
  });

  it('MyOrders render', async () => {
    window.scrollTo = jest.fn();

    const MyOrders = ticketCompliments?.MyOrders;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <MyOrders />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('my-orders')).toBeInTheDocument());
  });

  it('BalanceTransfer render', async () => {
    window.scrollTo = jest.fn();

    const BalanceTransfer = ticketCompliments?.BalanceTransfer;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <BalanceTransfer />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('balance-transfer')).toBeInTheDocument());
  });

  it('AutoUploadInstructions render', async () => {
    window.scrollTo = jest.fn();

    const AutoUploadInstructions = ticketCompliments?.AutoUploadInstructions;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <AutoUploadInstructions />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('auto-upload-instructions')).toBeInTheDocument());
  });
});
