import React, { Suspense } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import List from '../../../../pages/ticketRestaurant/autoUploadInstructions/List';
import ReduxProvider from '../../../store/reduxProvider';
import { LoadingImage } from '../../../../components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const state = {
  autoUploadInstructions: {
    selectedAutoUploadDetails: [],
    completedId: null,
    list: [
      {
        periodType: 'Günlük',
        startDay: 1,
        confirmEveryMonth: false,
        totalCount: 0,
        totalPrice: 0,
        isActive: true,
        id: 6066644,
      },
      {
        periodType: 'Günlük',
        startDay: 1,
        confirmEveryMonth: false,
        totalCount: 0,
        totalPrice: 0,
        isActive: false,
        id: 6066645,
      },
    ],
    detailList: [],
    tempList: [],
    currentInstruction: {
      id: 0,
      periodType: 1,
      vouId: 1,
      segId: 1000,
      isActive: false,
      isStatus: false,
    },
    activeStep: 0,
    instructionType: 0,
    totalCount: 0,
    totalPrice: 0,
    tableProperty: {
      currentPage: 1,
      page: 1,
      pageSize: 10,
      totalCount: 0,
    },
    filterObject: {
      body: {},
      pageNumber: 1,
      pageSize: 10,
    },
    detailTableProperty: {
      currentPage: 1,
      page: 1,
      pageSize: 10,
      totalCount: 0,
    },
    detailFilterObject: {
      body: {},
      pageNumber: 1,
      pageSize: 10,
    },
  },
};

describe('Ticket restaurant autoUploadInstructions List pages render test', () => {
  it('List render', async () => {
    window.scrollTo = jest.fn();

    const history = createMemoryHistory();

    const { getAllByTestId } = render(
      <Suspense fallback={<LoadingImage />}>
        <Router history={history}>
          <ReduxProvider reduxState={state}>
            <List />
          </ReduxProvider>
        </Router>
      </Suspense>,
    );

    await waitFor(() => fireEvent.click(getAllByTestId('update')[0]));
    await waitFor(() => fireEvent.click(getAllByTestId('status-passive')[0]));
    await waitFor(() => fireEvent.click(getAllByTestId('status-active')[0]));
    await waitFor(() => fireEvent.click(getAllByTestId('delete')[0]));
    await waitFor(() =>
      fireEvent.click(getAllByTestId('pagination')[0].querySelector('.ant-pagination-item')),
    );
  });
});
