import { render } from '@testing-library/react';
import CardFilter from '../../../../pages/ticketRestaurant/manageMyCards/CardFilter';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('CardFilter tests', () => {
  it('CardFilter render', () => {
    render(<CardFilter />, { wrapper: ReduxWrapper });
  });
});
