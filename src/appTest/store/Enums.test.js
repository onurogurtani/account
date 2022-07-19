import { monthsList, orderTypeList } from '../../store/enums';

describe('Store enums render', () => {
  it('Month list should be render', () => {
    let monthsListMock = [];
    const months = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];

    monthsListMock = months.map((text, index) => {
      return { value: index + 1, text };
    });

    expect(monthsList).toMatchObject(monthsListMock);
  });

  it('Order type list should be render', () => {
    let orderTypeListMock = [];

    const orders = ['Standart Sipariş', 'Ramazan Sipariş', 'Bayram Yardımı', 'Yılbaşı Hediyesi'];
    orderTypeListMock = orders.map((text, index) => {
      return { value: index, text };
    });

    expect(orderTypeList).toMatchObject(orderTypeListMock);
  });
});
