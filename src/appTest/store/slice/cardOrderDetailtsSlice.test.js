import {
  cardOrderDetailsGelAll,
  cardOrderDetailSave,
  cardOrderDetailUpdate,
  cardOrderDetailDelete,
} from '../../../store/slice/cardOrderDetailtsSlice';
import { store } from '../../../store/store';

describe('CardOrderDetail slice tests', () => {
  it('cardOrderDetailsGelAll call', () => {
    store.dispatch(cardOrderDetailsGelAll());
  });

  it('cardOrderDetailSave call', () => {
    store.dispatch(cardOrderDetailSave());
  });

  it('cardOrderDetailUpdate call', () => {
    store.dispatch(cardOrderDetailUpdate());
  });

  it('cardOrderDetailDelete call', () => {
    store.dispatch(cardOrderDetailDelete());
  });
});
