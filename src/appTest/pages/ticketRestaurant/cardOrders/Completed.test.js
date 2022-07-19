import { render } from '@testing-library/react';
import Completed from '../../../../pages/ticketRestaurant/cardOrders/Completed';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('Completed tests', () => {
  it('Completed render', () => {
    render(<Completed />, { wrapper: ReduxWrapper });
  });
});
