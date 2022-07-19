import { cityGetAll, countyGetAll, neighborhoodGetAll } from '../../../store/slice/lookupSlice';
import { store } from '../../../store/store';

describe('Lookup slice tests', () => {
  it('cityGetAll call', () => {
    store.dispatch(cityGetAll());
  });

  it('countyGetAll call', () => {
    store.dispatch(countyGetAll());
  });

  it('neighborhoodGetAll call', () => {
    store.dispatch(neighborhoodGetAll());
  });
});
