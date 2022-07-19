import {
  orderGetPageList,
  orderDetailsGetPageList,
  packagesGetPagedList,
  packagesUpdate,
  orderInfosGetList,
  orderDelete,
  paymentLinksAdd,
  getMailList,
} from '../../../store/slice/orderSlice';
import { store } from '../../../store/store';

describe('Order slice tests', () => {
  it('orderGetPageList call', () => {
    store.dispatch(orderGetPageList());
  });

  it('orderDetailsGetPageList call', () => {
    store.dispatch(orderDetailsGetPageList());
  });

  it('packagesGetPagedList call', () => {
    store.dispatch(packagesGetPagedList());
  });

  it('packagesUpdate call', () => {
    store.dispatch(packagesUpdate());
  });

  it('orderInfosGetList call', () => {
    store.dispatch(orderInfosGetList());
  });

  it('orderDelete call', () => {
    store.dispatch(orderDelete());
  });

  it('paymentLinksAdd call', () => {
    store.dispatch(paymentLinksAdd());
  });

  it('getMailList call', () => {
    store.dispatch(getMailList());
  });
});
