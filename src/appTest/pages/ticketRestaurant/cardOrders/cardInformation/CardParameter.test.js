import { render } from '@testing-library/react';
import CardParameter from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/CardParameter';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('CardParameter tests', () => {
  it('CardParameter render', () => {
    render(<CardParameter />, { wrapper: ReduxWrapper });
  });
});
