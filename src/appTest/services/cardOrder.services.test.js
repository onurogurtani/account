import cardOrderServices from '../../services/cardOrder.services';

describe('CardOrder services tests', () => {
  it('getCurrentCardOrder call', () => {
    cardOrderServices.getCurrentCardOrder({ customerId: 1 });
  });

  it('getCardOrders call', () => {
    cardOrderServices.getCardOrders({ id: 1 });
  });

  it('cardOrdersSave call', () => {
    cardOrderServices.cardOrdersSave();
  });

  it('cardOrdersUpdate call', () => {
    cardOrderServices.cardOrdersUpdate();
  });

  it('cardOrdersDelete call', () => {
    cardOrderServices.cardOrdersDelete({ id: 1 });
  });

  it('deleteUnCompleted call', () => {
    cardOrderServices.deleteUnCompleted();
  });

  it('getDraftedCardOrders call', () => {
    cardOrderServices.getDraftedCardOrders({ customerId: 1, pageSize: 1, pageNumber: 1 });
  });
});
