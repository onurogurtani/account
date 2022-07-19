import mobilExpressServices from '../../services/mobilExpress.services';

describe('MobilExpress services tests', () => {
  it('storedCardGelAll call', () => {
    mobilExpressServices.storedCardGelAll();
  });

  it('storedCardSave call', () => {
    mobilExpressServices.storedCardSave();
  });

  it('processPayment call', () => {
    mobilExpressServices.processPayment();
  });

  it('finishPaymentProcess call', () => {
    mobilExpressServices.finishPaymentProcess();
  });

  it('getBankOfBinNumber call', () => {
    mobilExpressServices.getBankOfBinNumber();
  });
});
