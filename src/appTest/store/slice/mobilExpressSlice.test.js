import {
  storedCardGelAll,
  storedCardSave,
  processPayment,
  getBankOfBinNumber,
  finishPaymentProcess,
} from '../../../store/slice/mobilExpressSlice';
import { store } from '../../../store/store';

describe('Mobile express slice tests', () => {
  it('storedCardGelAll call', () => {
    store.dispatch(storedCardGelAll());
  });

  it('storedCardSave call', () => {
    store.dispatch(storedCardSave());
  });

  it('processPayment call', () => {
    store.dispatch(processPayment());
  });

  it('getBankOfBinNumber call', () => {
    store.dispatch(getBankOfBinNumber());
  });

  it('finishPaymentProcess call', () => {
    store.dispatch(finishPaymentProcess());
  });
});
