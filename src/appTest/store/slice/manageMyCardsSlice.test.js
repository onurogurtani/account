import {
  cardGetPagedList,
  processTypesGetPagedList,
  cardsCancelList,
  employeesUpdateList,
  cancelRequestsDelete,
} from '../../../store/slice/manageMyCardsSlice';
import { store } from '../../../store/store';

describe('ManageMyCards slice tests', () => {
  it('cardGetPagedList call', () => {
    store.dispatch(cardGetPagedList());
  });

  it('processTypesGetPagedList call', () => {
    store.dispatch(processTypesGetPagedList());
  });

  it('cardsCancelList call', () => {
    store.dispatch(cardsCancelList());
  });

  it('employeesUpdateList call', () => {
    store.dispatch(employeesUpdateList());
  });

  it('cancelRequestsDelete call', () => {
    store.dispatch(cancelRequestsDelete());
  });
});
