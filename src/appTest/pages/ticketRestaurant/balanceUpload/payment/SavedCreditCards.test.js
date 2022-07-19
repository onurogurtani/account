import { render } from '@testing-library/react';
import SavedCreditCards from '../../../../../pages/ticketRestaurant/balanceUpload/payment/SavedCreditCards';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('SavedCreditCards tests', () => {
  it('SavedCreditCards render', () => {
    render(<SavedCreditCards />, { wrapper: ReduxWrapper });
  });
});
