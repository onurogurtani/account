import orderServices from '../../services/order.services';

describe('Order services tests', () => {
  it('orderGetPageList call', () => {
    orderServices.orderGetPageList({ data: {}, pageNumber: 1, pageSize: 10 });
  });

  it('orderDetailsGetPageList call', () => {
    orderServices.orderDetailsGetPageList({ data: {}, pageNumber: 1, pageSize: 10 });
  });

  it('packagesGetPagedList call', () => {
    orderServices.packagesGetPagedList({ data: {}, pageNumber: 1, pageSize: 10 });
  });

  it('packagesUpdate call', () => {
    orderServices.packagesUpdate();
  });

  it('orderInfosGetList call', () => {
    orderServices.orderInfosGetList({ data: {}, pageNumber: 1, pageSize: 10 });
  });

  it('orderDelete call', () => {
    orderServices.orderDelete();
  });

  it('paymentLinksAdd call', () => {
    orderServices.paymentLinksAdd();
  });

  it('getMailList call', () => {
    orderServices.getMailList(1);
  });

  it('downloadOrderFile call', () => {
    orderServices.downloadOrderFile();
  });
});
