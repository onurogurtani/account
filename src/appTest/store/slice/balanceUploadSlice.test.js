import {
  getCurrentLoadBalance,
  getById,
  getPreviousLoadBalance,
  getDraftedLoadBalances,
  prepareLoadBalance,
  loadBalancesSave,
  loadBalancesUpdate,
  loadBalancesDelete,
  copyLoadBalance,
} from '../../../store/slice/balanceUploadSlice';
import { store } from '../../../store/store';

describe('Balance upload slice tests', () => {
  it('getCurrentLoadBalance call', () => {
    store.dispatch(getCurrentLoadBalance());
  });

  it('getById call', () => {
    store.dispatch(getById());
  });

  it('getPreviousLoadBalance call', () => {
    store.dispatch(getPreviousLoadBalance());
  });

  it('getDraftedLoadBalances call', () => {
    store.dispatch(getDraftedLoadBalances());
  });

  it('prepareLoadBalance call', () => {
    store.dispatch(prepareLoadBalance());
  });

  it('loadBalancesSave call', () => {
    store.dispatch(loadBalancesSave());
  });

  it('loadBalancesUpdate call', () => {
    store.dispatch(loadBalancesUpdate());
  });

  it('loadBalancesDelete call', () => {
    store.dispatch(loadBalancesDelete());
  });

  it('copyLoadBalance call', () => {
    store.dispatch(copyLoadBalance());
  });
});
