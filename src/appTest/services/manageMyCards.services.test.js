import manageCardsServices from '../../services/manageMyCards.services';

describe('Lookup services tests', () => {
  it('cardGetPagedList call', () => {
    manageCardsServices.cardGetPagedList({ data: {}, pageNumber: 0, pageSize: 0 });
  });

  it('processTypesGetPagedList call', () => {
    manageCardsServices.processTypesGetPagedList();
  });

  it('cardsCancelList call', () => {
    manageCardsServices.cardsCancelList(1);
  });

  it('employeesUpdateList call', () => {
    manageCardsServices.employeesUpdateList(1);
  });

  it('cancelRequestsDelete call', () => {
    manageCardsServices.cancelRequestsDelete(1);
  });
});
