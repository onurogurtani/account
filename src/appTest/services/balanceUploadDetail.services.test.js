import balanceUploadDetailServices from '../../services/balanceUploadDetail.services';

describe('BalanceUploadDetail services tests', () => {
  it('loadBalanceDetailsGetPagedList call', () => {
    balanceUploadDetailServices.loadBalanceDetailsGetPagedList(1, 1, 1);
  });

  it('updateLoadBalanceDetailPrice call', () => {
    balanceUploadDetailServices.updateLoadBalanceDetailPrice();
  });

  it('loadBalanceDetailUpdate call', () => {
    balanceUploadDetailServices.loadBalanceDetailUpdate();
  });

  it('loadBalanceDetailExcelTemplate call', () => {
    balanceUploadDetailServices.loadBalanceDetailExcelTemplate();
  });

  it('loadBalanceDetailExcelUpload call', () => {
    balanceUploadDetailServices.loadBalanceDetailExcelUpload();
  });
});
