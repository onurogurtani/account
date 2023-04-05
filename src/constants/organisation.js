export const segmentInformation = [
  { id: 1, value: 'SA' },
  { id: 2, value: 'MA' },
  { id: 3, value: 'SMB' },
  { id: 4, value: 'PA' },
];
export const serviceInformation = [
  { id: 1, value: 'Bitmeet' },
  { id: 2, value: 'Zoom' },
];
export const packageType = [
  {
    id: 1,
    label: 'Bireysel Paketler',
    value: true,
  },
  {
    id: 2,
    label: 'Kurumsal Paketler',
    value: false,
  },
];
export const statusList = [
  { id: 1, value: 'Aksiyon Bekleniyor' },
  { id: 2, value: 'Aktif' },
  { id: 3, value: 'İptal' },
  { id: 4, value: 'Askıya Alındı' },
];
export const statusInformation = {
  1: { value: 'Aksiyon Bekliyor', color: 'yellow', operation: '' },
  2: { value: 'Aktif', color: 'green', operation: '`Aktifleştirmek`' },
  3: { value: 'İptal', color: 'red', operation: '`İptal Etmek`' },
  4: { value: 'Askıya Alındı', color: 'blue', operation: '`Askıya Almak`' }
}
export const statusButtonList = [
  { id: 2, key: 'active', value: 'Aktifleştir', className: 'active-btn', visibleStatesButton: [1, 4] },
  { id: 3, key: 'cancel', value: 'Kaydı İptal Et', className: 'call-of-button', visibleStatesButton: [1] },
  { id: 4, key: 'suspend', value: 'Askıya Al', className: 'suspend-btn', visibleStatesButton: [2] },
]
export const radioOptions = [
  {
    id: 1,
    label: 'Evet',
    value: true,
  },
  {
    id: 2,
    label: 'Hayır',
    value: false,
  },
];

