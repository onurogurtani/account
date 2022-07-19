import { render } from '@testing-library/react';
import BalanceTypeFilter from '../../../../../pages/ticketRestaurant/manageMyCards/balanceTransfer/BalanceTypeFilter';
import { ReduxWrapper } from '../../../../../components/ReduxWrapper';

describe('BalanceTypeFilter tests', () => {
  it('BalanceTypeFilter render', () => {
    render(<BalanceTypeFilter />, { wrapper: ReduxWrapper });
  });
});
