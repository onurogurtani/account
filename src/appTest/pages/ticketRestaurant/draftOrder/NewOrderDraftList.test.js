import { render } from '@testing-library/react';
import NewOrderDraftList from '../../../../pages/ticketRestaurant/draftOrder/NewOrderDraftList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('NewOrderDraftList tests', () => {
  it('NewOrderDraftList render', () => {
    render(<NewOrderDraftList />, { wrapper: ReduxWrapper });
  });
});
