import { render } from '@testing-library/react';
import PaymentType from '../../../../../pages/ticketRestaurant/cardOrders/payment/PaymentType';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('PaymentType tests', () => {
  it('PaymentType render', () => {
    render(<PaymentType />, { wrapper: ReduxWrapper });
  });
});
