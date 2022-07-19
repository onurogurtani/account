import { render } from '@testing-library/react';
import OrderList from '../../../../pages/ticketRestaurant/myOrders/OrderList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('OrderList tests', () => {
  it('OrderList render', () => {
    render(<OrderList />, { wrapper: ReduxWrapper });
  });
});
