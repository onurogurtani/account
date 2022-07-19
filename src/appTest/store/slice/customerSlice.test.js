import { userCustomersGetList, customerLogosGetList } from '../../../store/slice/customerSlice';
import { store } from '../../../store/store';

describe('Customer slice tests', () => {
  it('userCustomersGetList call', () => {
    store.dispatch(userCustomersGetList());
  });

  it('customerLogosGetList call', () => {
    store.dispatch(customerLogosGetList());
  });
});
