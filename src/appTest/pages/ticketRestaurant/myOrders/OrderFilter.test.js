import { render } from '@testing-library/react';
import OrderFilter from '../../../../pages/ticketRestaurant/myOrders/OrderFilter';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('OrderFilter tests', () => {
  it('OrderFilter render', () => {
    render(<OrderFilter />, { wrapper: ReduxWrapper });
  });
});
