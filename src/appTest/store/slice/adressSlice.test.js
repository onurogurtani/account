import { addressSave, addressGetList } from '../../../store/slice/addressSlice';
import { store } from '../../../store/store';

describe('Adress slice tests', () => {
  it('addressSave call', () => {
    store.dispatch(addressSave());
  });

  it('addressGetList call', () => {
    store.dispatch(addressGetList());
  });
});
