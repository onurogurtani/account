import { render } from '@testing-library/react';
import EftWireTransferCards from '../../../../../pages/ticketRestaurant/balanceUpload/payment/EftWireTransferCards';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('EftWireTransferCards tests', () => {
  it('EftWireTransferCards render', () => {
    render(<EftWireTransferCards />, { wrapper: ReduxWrapper });
  });
});
