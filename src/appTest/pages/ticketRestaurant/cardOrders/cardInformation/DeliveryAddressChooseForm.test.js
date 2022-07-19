import { render } from '@testing-library/react';
import DeliveryAddressChooseForm from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/DeliveryAddressChooseForm';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('DeliveryAddressChooseForm tests', () => {
  it('DeliveryAddressChooseForm render', () => {
    render(<DeliveryAddressChooseForm />, { wrapper: ReduxWrapper });
  });
});
