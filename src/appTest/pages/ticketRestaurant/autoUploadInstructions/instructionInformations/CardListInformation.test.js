import { render, waitFor, fireEvent } from '@testing-library/react';
import CardListInformation from '../../../../../pages/ticketRestaurant/autoUploadInstructions/instructionInformations/CardListInformation';
import ReduxProvider from '../../../../store/reduxProvider';

const state = {
  autoUploadInstructions: {
    selectedAutoUploadDetails: [],
    completedId: null,
    detailList: [
      {
        name: 'test',
        surname: 'test',
        refNo: 1,
        cardNumber: 0,
        price: 0,
        id: 0,
      },
      {
        name: 'test',
        surname: 'test',
        refNo: 1,
        cardNumber: 0,
        price: 0,
        id: 1,
      },
    ],
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

describe('CardListInformation tests', () => {
  it('CardListInformation render', async () => {
    const { getAllByTestId } = render(
      <ReduxProvider reduxState={state}>
        <CardListInformation />
      </ReduxProvider>,
    );

    await waitFor(() => fireEvent.blur(getAllByTestId('price')[0]));
  });
});
