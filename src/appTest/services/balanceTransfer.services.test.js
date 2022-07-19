import balanceTransferServices from '../../services/balanceTransfer.services';

describe('Balance transfer services tests', () => {
  it('getCardBalanceList call', () => {
    balanceTransferServices.getCardBalanceList({ data: {} });
  });

  it('addBalanceTransfers call', () => {
    balanceTransferServices.addBalanceTransfers();
  });
});
