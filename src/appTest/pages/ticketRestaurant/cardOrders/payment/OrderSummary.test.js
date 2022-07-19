import { render } from '@testing-library/react';
import OrderSummary from '../../../../../pages/ticketRestaurant/cardOrders/payment/OrderSummary';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('OrderSummary tests', () => {
  it('OrderSummary render', () => {
    render(<OrderSummary />, { wrapper: ReduxWrapper });
  });
});
