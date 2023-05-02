const data = [
    {
        key: '1',
        keyTwo: '1.1',
        versionNumber: '1.0',
        status: 'active',
        classStageType: 'type1',
        approverUser: 'John Doe',
        approvedDate: '01/01/2020',
        code: '1',
        prevData: 'value1',
        currentData: 'value2',
    },
    {
        key: '2',
        keyTwo: '2.1',
        versionNumber: '2.0',
        status: 'inactive',
        classStageType: 'type2',
        approverUser: 'Jane Doe',
        approvedDate: '02/02/2020',
        code: '2',
        prevData: 'value3',
        currentData: 'value4',
    },
];

const pagedProperty = {
    totalCount: 1500,
    current: 2,
    pageSize: 10,
};

const versionSelectData = [
    { id: 0, type: 'YKS Lisans Atlası' },
    { id: 1, type: 'YKS Önlisans Atlası' },
    { id: 2, type: 'LGS PDF ekle ' },
];
const yokChangesConfirmStatusEnum = {
    0: 'Waiting',
    1: 'AutoConfirm',
    2: 'Confirm',
    3: 'Reject',
};

const yokTypeEnum = {
    0: 'Licence',
    1: 'AssociateDegree',
    2: 'HighSchool',
};
const yokChangesTrConfirmStatusEnum = {
    0: 'Onay Bekliyor',
    1: 'Otomatik Onaylandı',
    2: 'Onaylandı',
    3: 'İptal Edildi',
};

const yokTypeTrEnum = {
    0: 'Lisans',
    1: 'Önlisans',
    2: 'Lgs',
};
const lgsTranslations = {
    "code": "Kod",
    "city": "Şehir",
    "county": "İlçe",
    "schoolName": "Okul Adı",
    "type": "Okul Türü",
    "department": "Bölüm",
    "foreignLanguage": "Yabancı Dil",
    "basePoint": "Taban Puan",
    "basePointPercentage": "Taban Puan Yüzdesi",
    "ceilingPoint": "Tavan Puan",
    "ceilingPointPercentage": "Tavan Puan Yüzdesi"
  };

  const ascTranslations={
    "id": "Kimlik Numarası",
    "code": "Kod",
    "university": "Üniversite",
    "programName": "Program Adı",
    "universityPointType": "Puan Türü",
    "scholarshipType": "Burs Türü",
    "city": "Şehir",
    "universityType": "Üniversite Türü",
    "universityEducationType": "Eğitim Türü",
    "quota": "Kontenjan",
    "basePoint": "Taban Puan",
    "baseSuccessRanking": "Taban Başarı Sıralaması",
    "year": "Yıl",
    "averageObp": "Ortalama Başarı Puanı",
    "yksNetAverageTitlesRaw": "YKS Net Ortalamaları",   
    "yksNetAverageValuesRaw": "YKS Net Ortalamaları",
    "yksNetAverageValues":"YKS Net Ortalama Değerler"
 }
 const licenceTransations={
    "id": "id",
    "code": "kod",
    "university": "üniversite",
    "faculty": "fakülte",
    "programName": "program adı",
    "languageScholarshipYearInfo": "dil bursu yılı bilgisi",
    "universityPointType": "üniversite puan türü",
    "scholarshipType": "burs tipi",
    "city": "şehir",
    "universityType": "üniversite türü",
    "universityEducationType": "üniversite eğitim türü",
    "quota": "kontenjan",
    "repletion": "yenileme",
    "settler": "yerleşen",
    "basePoint": "taban puan",
    "baseSuccessRanking": "taban başarı sıralaması",
    "year": "yıl",
    "averageSuccessRanking": "ortalama başarı sıralaması",
    "averageObp": "ortalama obp",
    "yksNetAverageTitlesRaw": "yks net ortalamaları başlıkları (ham veri)",
    "yksNetAverageTitles": [
      "yks net ortalamaları başlıkları"
    ],
    "yksNetAverageValuesRaw": "yks net ortalamaları değerleri (ham veri)",
    "yksNetAverageValues": [
      "yks net ortalamaları değerleri"
    ]
  }
  
export {
    data,
    pagedProperty,
    versionSelectData,
    yokTypeEnum,
    yokChangesConfirmStatusEnum,
    yokChangesTrConfirmStatusEnum,
    yokTypeTrEnum,
};
