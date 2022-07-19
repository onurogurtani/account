import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import TicketRestaurant from '../../../pages/ticketRestaurant';
import { LoadingImage } from '../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ReduxWrapper } from '../../../components/ReduxWrapper';

describe('Ticket restaurant autoUploadInstructions pages render test', () => {
  it('CardOrders render', async () => {
    window.scrollTo = jest.fn();

    const CardOrders = TicketRestaurant?.CardOrders;
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

    const BalanceUpload = TicketRestaurant?.BalanceUpload;
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

    const DraftOrder = TicketRestaurant?.DraftOrder;
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

    const ManageMyCards = TicketRestaurant?.ManageMyCards;
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

    const MyOrders = TicketRestaurant?.MyOrders;
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

    const BalanceTransfer = TicketRestaurant?.BalanceTransfer;
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

  it('DeliveryConfirmation render', async () => {
    window.scrollTo = jest.fn();

    const DeliveryConfirmation = TicketRestaurant?.DeliveryConfirmation;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <DeliveryConfirmation />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('delivery-confirmation')).toBeInTheDocument());
  });

  it('AutoUploadInstructions render', async () => {
    window.scrollTo = jest.fn();

    const AutoUploadInstructions = TicketRestaurant?.AutoUploadInstructions;
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

  it('NewInstruction render', async () => {
    window.scrollTo = jest.fn();

    const NewInstruction = TicketRestaurant?.NewInstruction;
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <NewInstruction />
        </Router>
      </Suspense>,
      { wrapper: ReduxWrapper },
    );

    await waitFor(() => expect(getByTestId('new-instruction')).toBeInTheDocument());
  });
});
