import { render } from '@testing-library/react';
import DeliveryAddressUpdateModal from '../../../../pages/ticketRestaurant/manageMyCards/DeliveryAddressUpdateModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('DeliveryAddressUpdateModal tests', () => {
  it('DeliveryAddressUpdateModal render', () => {
    render(<DeliveryAddressUpdateModal />, { wrapper: ReduxWrapper });
  });
});
