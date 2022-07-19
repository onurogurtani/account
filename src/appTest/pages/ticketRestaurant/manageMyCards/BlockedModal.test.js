import { render } from '@testing-library/react';
import BlockedModal from '../../../../pages/ticketRestaurant/manageMyCards/BlockedModal';
import { ReduxWrapper } from '../../../../components/ReduxWrapper';

describe('BlockedModal tests', () => {
  it('BlockedModal render', () => {
    render(<BlockedModal />, { wrapper: ReduxWrapper });
  });
});
