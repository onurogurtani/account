import { render } from '@testing-library/react';
import NewCreditCards from '../../../../../pages/ticketRestaurant/balanceUpload/payment/NewCreditCards';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('NewCreditCards tests', () => {
  it('NewCreditCards render', () => {
    render(<NewCreditCards />, { wrapper: ReduxWrapper });
  });
});
