import { render } from '@testing-library/react';
import CreditCards from '../../../../../pages/ticketRestaurant/balanceUpload/payment/CreditCards';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('CreditCards tests', () => {
  it('CreditCards render', () => {
    render(<CreditCards />, { wrapper: ReduxWrapper });
  });
});
