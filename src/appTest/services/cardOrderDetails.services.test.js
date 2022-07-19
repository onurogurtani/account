import cardOrderDetailsServices from '../../services/cardOrderDetails.services';

describe('CardOrderDetails services tests', () => {
  it('cardOrderDetailsGelAll call', () => {
    cardOrderDetailsServices.cardOrderDetailsGelAll({ data: {}, pageNumber: 1, pageSize: 10 });
  });

  it('cardOrderDetailSave call', () => {
    cardOrderDetailsServices.cardOrderDetailSave();
  });

  it('cardOrderDetailUpdate call', () => {
    cardOrderDetailsServices.cardOrderDetailUpdate();
  });

  it('cardOrderDetailDelete call', () => {
    cardOrderDetailsServices.cardOrderDetailDelete({ id: 1 });
  });

  it('getCardOrderDetailExcelTemplate call', () => {
    cardOrderDetailsServices.getCardOrderDetailExcelTemplate();
  });

  it('setCardOrderDetailExcelUpload call', () => {
    cardOrderDetailsServices.setCardOrderDetailExcelUpload();
  });
});
