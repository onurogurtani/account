import { render } from '@testing-library/react';
import OrderSummaryModal from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/OrderSummaryModal';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('OrderSummaryModal tests', () => {
  it('OrderSummaryModal render', () => {
    render(<OrderSummaryModal />, { wrapper: ReduxWrapper });
  });
});
