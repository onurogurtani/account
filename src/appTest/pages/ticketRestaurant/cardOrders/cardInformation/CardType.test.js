import { render } from '@testing-library/react';
import CardType from '../../../../../pages/ticketRestaurant/cardOrders/cardInformation/CardType';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('CardType tests', () => {
  it('CardType render', () => {
    render(<CardType />, { wrapper: ReduxWrapper });
  });
});
