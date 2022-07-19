import balanceUploadServices from '../../services/balanceUpload.services';

describe('Balance upload services tests', () => {
  it('getCurrentLoadBalance call', () => {
    balanceUploadServices.getCurrentLoadBalance({ customerId: 1 });
  });

  it('getPreviousLoadBalance call', () => {
    balanceUploadServices.getPreviousLoadBalance();
  });

  it('prepareLoadBalance call', () => {
    balanceUploadServices.prepareLoadBalance();
  });

  it('getDraftedLoadBalances call', () => {
    balanceUploadServices.getDraftedLoadBalances({ customerId: 1, pageSize: 1, pageNumber: 1 });
  });

  it('loadBalancesSave call', () => {
    balanceUploadServices.loadBalancesSave();
  });

  it('loadBalancesUpdate call', () => {
    balanceUploadServices.loadBalancesUpdate();
  });

  it('loadBalancesDelete call', () => {
    balanceUploadServices.loadBalancesDelete({ id: 1 });
  });

  it('getById call', () => {
    balanceUploadServices.getById({ id: 1 });
  });

  it('copyLoadBalance call', () => {
    balanceUploadServices.copyLoadBalance();
  });
});
