import { render } from '@testing-library/react';
import PaymentType from '../../../../../pages/ticketRestaurant/balanceUpload/payment/PaymentType';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('PaymentType tests', () => {
  it('PaymentType render', () => {
    render(<PaymentType />, { wrapper: ReduxWrapper });
  });
});
