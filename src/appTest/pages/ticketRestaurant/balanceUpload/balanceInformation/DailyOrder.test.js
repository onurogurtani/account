import { render } from '@testing-library/react';
import DailyOrder from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/DailyOrder';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('DailyOrder tests', () => {
  it('DailyOrder render', () => {
    render(<DailyOrder />, { wrapper: ReduxWrapper });
  });
});
