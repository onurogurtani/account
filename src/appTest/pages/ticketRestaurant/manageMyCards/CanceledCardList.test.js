import { render } from '@testing-library/react';
import CanceledCardList from '../../../../pages/ticketRestaurant/manageMyCards/CanceledCardList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('CanceledCardList tests', () => {
  it('CanceledCardList render', () => {
    render(<CanceledCardList />, { wrapper: ReduxWrapper });
  });
});
