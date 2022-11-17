import { monthsList } from '../../store/enums';

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
});
