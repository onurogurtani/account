import { render } from '@testing-library/react';
import DeliveryAddressAddForm from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/DeliveryAddressAddForm';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('DeliveryAddressAddForm tests', () => {
  it('DeliveryAddressAddForm render', () => {
    render(<DeliveryAddressAddForm />, { wrapper: ReduxWrapper });
  });
});
