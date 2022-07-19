import { render } from '@testing-library/react';
import OrderType from '../../../../../pages/ticketRestaurant/balanceUpload/balanceInformation/OrderType';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('OrderType tests', () => {
  it('OrderType render', () => {
    render(<OrderType />, { wrapper: ReduxWrapper });
  });
});
