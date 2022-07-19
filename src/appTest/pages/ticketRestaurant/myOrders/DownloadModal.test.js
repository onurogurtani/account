import { render } from '@testing-library/react';
import DownloadModal from '../../../../pages/ticketRestaurant/myOrders/DownloadModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('DownloadModal tests', () => {
  it('DownloadModal render', () => {
    render(<DownloadModal />, { wrapper: ReduxWrapper });
  });
});
