import {
  getCurrentCardOrder,
  getCardOrders,
  cardOrdersSave,
  getDraftedCardOrders,
  cardOrdersUpdate,
  cardOrdersDelete,
  deleteUnCompleted,
} from '../../../store/slice/cardOrderSlice';
import { store } from '../../../store/store';

describe('CardOrder slice tests', () => {
  it('getCurrentCardOrder call', () => {
    store.dispatch(getCurrentCardOrder());
  });

  it('getCardOrders call', () => {
    store.dispatch(getCardOrders());
  });

  it('cardOrdersSave call', () => {
    store.dispatch(cardOrdersSave());
  });

  it('getDraftedCardOrders call', () => {
    store.dispatch(getDraftedCardOrders());
  });

  it('cardOrdersUpdate call', () => {
    store.dispatch(cardOrdersUpdate());
  });

  it('cardOrdersDelete call', () => {
    store.dispatch(cardOrdersDelete());
  });

  it('deleteUnCompleted call', () => {
    store.dispatch(deleteUnCompleted());
  });
});
