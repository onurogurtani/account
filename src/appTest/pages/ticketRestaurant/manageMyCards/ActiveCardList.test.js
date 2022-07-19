import { render } from '@testing-library/react';
import ActiveCardList from '../../../../pages/ticketRestaurant/manageMyCards/ActiveCardList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('ActiveCardList tests', () => {
  it('ActiveCardList render', () => {
    render(<ActiveCardList />, { wrapper: ReduxWrapper });
  });
});
