import reportsServices from '../../services/reports.services';

describe('Profile services tests', () => {
  it('getCardOrderReport call', () => {
    reportsServices.getCardOrderReport({ orderId: 1 });
  });

  it('getBalanceOrderReport call', () => {
    reportsServices.getBalanceOrderReport({ orderId: 1 });
  });

  it('getOrderReport call', () => {
    reportsServices.getOrderReport();
  });

  it('getOrderSummaryPdfReport call', () => {
    reportsServices.getOrderSummaryPdfReport();
  });

  it('getAutoLoadingReport call', () => {
    reportsServices.getAutoLoadingReport({ customerId: 1, vouId: 1, id: 1 });
  });
});
