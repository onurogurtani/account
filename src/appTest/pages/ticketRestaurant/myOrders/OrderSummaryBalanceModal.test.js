import { render } from '@testing-library/react';
import OrderSummaryBalanceModal from '../../../../pages/ticketRestaurant/myOrders/OrderSummaryBalanceModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('OrderSummaryBalanceModal tests', () => {
  it('OrderSummaryBalanceModal render', () => {
    render(<OrderSummaryBalanceModal />, { wrapper: ReduxWrapper });
  });
});
