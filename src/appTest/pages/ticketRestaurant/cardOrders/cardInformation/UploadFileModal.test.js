import { render } from '@testing-library/react';
import UploadFileModal from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/UploadFileModal';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('UploadFileModal tests', () => {
  it('UploadFileModal render', () => {
    render(<UploadFileModal />, { wrapper: ReduxWrapper });
  });
});
