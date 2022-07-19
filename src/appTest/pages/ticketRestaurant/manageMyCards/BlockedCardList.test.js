import { render } from '@testing-library/react';
import BlockedCardList from '../../../../pages/ticketRestaurant/manageMyCards/BlockedCardList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('BlockedCardList tests', () => {
  it('BlockedCardList render', () => {
    render(<BlockedCardList />, { wrapper: ReduxWrapper });
  });
});
