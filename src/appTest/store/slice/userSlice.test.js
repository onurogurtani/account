import { getCurrentUser, currentUserUpdate } from '../../../store/slice/userSlice';
import { store } from '../../../store/store';

describe('User slice tests', () => {
  it('getCurrentUser call', () => {
    store.dispatch(getCurrentUser());
  });

  it('currentUserUpdate call', () => {
    store.dispatch(currentUserUpdate());
  });
});
