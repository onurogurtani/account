import { render } from '@testing-library/react';
import MonthlyOrder from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/MonthlyOrder';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('MonthlyOrder tests', () => {
  it('MonthlyOrder render', () => {
    render(<MonthlyOrder />, { wrapper: ReduxWrapper });
  });
});
