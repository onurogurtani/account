import { getCardBalanceList, addBalanceTransfers } from '../../../store/slice/balanceTransferSlice';
import { store } from '../../../store/store';

describe('Balance transfer slice tests', () => {
  it('getCardBalanceList call', () => {
    store.dispatch(getCardBalanceList());
  });

  it('addBalanceTransfers call', () => {
    store.dispatch(addBalanceTransfers());
  });
});
