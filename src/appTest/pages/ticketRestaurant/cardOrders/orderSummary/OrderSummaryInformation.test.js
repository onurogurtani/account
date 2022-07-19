import { render } from '@testing-library/react';
import OrderSummaryInformation from '../../../../../pages/ticketRestaurant/cardOrders/orderSummary/OrderSummaryInformation';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('OrderSummaryInformation tests', () => {
  it('OrderSummaryInformation render', () => {
    render(<OrderSummaryInformation />, { wrapper: ReduxWrapper });
  });
});
