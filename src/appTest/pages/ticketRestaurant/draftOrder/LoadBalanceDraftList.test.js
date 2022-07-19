import { render } from '@testing-library/react';
import LoadBalanceDraftList from '../../../../pages/ticketRestaurant/draftOrder/LoadBalanceDraftList';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('LoadBalanceDraftList tests', () => {
  it('LoadBalanceDraftList render', () => {
    render(<LoadBalanceDraftList />, { wrapper: ReduxWrapper });
  });
});
