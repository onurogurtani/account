import {
  getLoadBalanceDetailsGetPagedList,
  loadBalanceDetailPriceUpdate,
  loadBalanceDetailExcelUpload,
  loadBalanceDetailExcelTemplate,
  loadBalanceDetailUpdate,
} from '../../../store/slice/balanceUploadDetailSlice';
import { store } from '../../../store/store';

describe('Balance upload detail slice tests', () => {
  it('getLoadBalanceDetailsGetPagedList call', () => {
    store.dispatch(getLoadBalanceDetailsGetPagedList());
  });

  it('loadBalanceDetailPriceUpdate call', () => {
    store.dispatch(loadBalanceDetailPriceUpdate());
  });

  it('loadBalanceDetailExcelUpload call', () => {
    store.dispatch(loadBalanceDetailExcelUpload());
  });

  it('loadBalanceDetailExcelTemplate call', () => {
    store.dispatch(loadBalanceDetailExcelTemplate());
  });

  it('loadBalanceDetailUpdate call', () => {
    store.dispatch(loadBalanceDetailUpdate());
  });
});
