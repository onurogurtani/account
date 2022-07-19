import { render } from '@testing-library/react';
import OrderSummaryCardModal from '../../../../pages/ticketRestaurant/myOrders/OrderSummaryCardModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('OrderSummaryCardModal tests', () => {
  it('OrderSummaryCardModal render', () => {
    render(<OrderSummaryCardModal />, { wrapper: ReduxWrapper });
  });
});
