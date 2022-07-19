import { render } from '@testing-library/react';
import PaymentModal from '../../../../pages/ticketRestaurant/myOrders/PaymentModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('PaymentModal tests', () => {
  it('PaymentModal render', () => {
    render(<PaymentModal />, { wrapper: ReduxWrapper });
  });
});
