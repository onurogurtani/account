import { render } from '@testing-library/react';
import Index from '../../../../../pages/ticketRestaurant/cardOrders/orderSummary';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('Index tests', () => {
  it('Index render', () => {
    render(<Index />, { wrapper: ReduxWrapper });
  });
});
