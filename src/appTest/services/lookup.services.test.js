import lookupServices from '../../services/lookup.services';

describe('Lookup services tests', () => {
  it('cityGetList call', () => {
    lookupServices.cityGetList();
  });

  it('countyGetList call', () => {
    lookupServices.countyGetList(1);
  });

  it('neighborhoodGetList call', () => {
    lookupServices.neighborhoodGetList(1);
  });
});
