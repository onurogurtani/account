import { Button } from 'antd';
import {  RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

// AŞAĞIDki data nın temizlenmesi gerekebilir: 
const data = [
  {
    id: 1,
    name: 'Static',
    isActive: true,
    createdUser: 'admin',
    createdDate: '2020-01-01',
    updatedUser: 'admin',
    updatedDate: '2020-02-01',
    startDate: '2020-01-01',
    endDate: '2021-01-01',
    surveyCompletionStatus: {
      id: 1,
      name: 'Incomplete',
    },
    surveyConstraint: {
      id: 1,
      name: 'None',
    },
    targetGroup: {
      id: 1,
      name: 'All',
    },
    category: {
      id: 1,
      name: 'All',
    },
    categoryId: 1,
    surveyConstraintId: 1,
    targetGroupId: 1,
    surveyCompletionStatusId: 1,
    questions: [
      {
        id: 1,
        headText: 'Açık Uçlu Soru ',
        text: 'Text',
        tags: 'Tags',
        isActive: true,
        questionType: {
          id: 1,
          name: 'Açık Uçlu',
        },
      },
      {
        id: 2,
        headText: 'Üçlü Likert Tipi Soru',
        text: 'Text',
        tags: 'Tags',
        isActive: true,
        questionType: {
          id: 2,
          name: 'Üçlü Likert',
        },
      },
      {
        id: 3,
        headText: 'Head Text',
        text: 'Text',
        tags: 'Tags',
        isActive: true,
        questionType: {
          id: 3,
          name: 'Çok Seçimli',
          options: ['Option 1', 'Option 2', 'Option 3'],
        },
      },
    ],
  },
];

const menuList = [
  {
    key: '1',
    name: 'Güncelle',
  },
  {
    key: '2',
    name: 'Sil',
  },
  {
    key: '3',
    name: 'Kopyala',
  },
  {
    key: '4',
    name: 'Pasif Et/Sonlandır',
  },
  {
    key: '5',
    name: 'Aktif Et/Yayınla',
  },
  {
    key: '6',
    name: 'İstatistikleri Göster',
  },
];

const sortList = [
  {
    key: 'id',
    ascend: 'IdASC',
    descend: 'IdDESC',
  },
  {
    key: 'name',
    ascend: 'NametASC',
    descend: 'NameDESC',
  },
  {
    key: 'isActive',
    ascend: 'IsActiveASC',
    descend: 'IsActiveDESC',
  },
  {
    key: 'category',
    ascend: 'CategoryASC',
    descend: 'CategoryDESC',
  },
  {
    key: 'startDate',
    ascend: 'StartDateASC',
    descend: 'StartDateDESC',
  },
  {
    key: 'endDate',
    ascend: 'EndDateASC',
    descend: 'EndDateDESC',
  },
  {
    key: 'isPublished',
    ascend: 'IsPublishedASC',
    descend: 'IsPublishedDESC',

  },
  {
    key: 'description',
    ascend: 'DescriptionASC',
    descend: 'DescriptionDESC',
  }

  
  
];



const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
    width: '50px',
    sorter: true,
  },
  {
    title: 'Anket Adı',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    
  },
  {
    title: 'Durum',
    dataIndex: 'isActive',
    key: 'isActive',
    sorter: true,
    render: (isActive) => {
      return isActive ? 'Aktif' : 'Pasif';
    },
  },
  {
    title: 'Kategori',
    dataIndex: 'category',
    key: 'category',
    sorter: true,
    render: (category) => {
      return category?.name;
    },
  },
  {
    title: 'Açıklama',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Anket Başlangıç Tarihi',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: true,
    render: (startDate) => {
      const date = dayjs(startDate)?.format('YYYY-MM-DD HH:mm');
      return date;
    },
  },
  {
    title: 'Anket Bitiş Tarihi',
    dataIndex: 'endDate',
    key: 'endDate',
    sorter: true,
    render: (endDate) => {
      const date = dayjs(endDate)?.format('YYYY-MM-DD HH:mm');
      return date;
    },
  },
  {
    title: 'Yayınlanma Durumu',
    dataIndex: 'publishStatus',
    key: 'publishStatus',
    width:'120px',
    sorter: true,
    render: (publishStatus) => {
      if(publishStatus==1){
        return (
          <span style={{ backgroundColor: '#00a483', borderRadius: '5px', boxShadow: '0 5px 5px 0', padding:'5px',width:'100px', display:'inline-block', textAlign:'center' }}>
            Yayında
          </span>
        ) 
      }else if(publishStatus==2){
        return (
          <span
            style={{ backgroundColor: '#ff8c00', borderRadius: '5px', boxShadow: '0 5px 5px 0', padding:'5px',width:'100px', display:'inline-block', textAlign:'center' }}
          >
            Yayında değil
          </span>
        );
      }else{
        return (
          <span
            style={{ backgroundColor: '#fcec03', borderRadius: '5px', boxShadow: '0 5px 5px 0', padding:'5px',width:'100px', display:'inline-block', textAlign:'center' }}
          >
            Taslak
          </span>
        );
      }  
    },
  },
  {
    title: 'İşlemler',
    dataIndex: 'draftDeleteAction',
    key: 'draftDeleteAction',
    width: 100,
    align: 'center',
    render: (_, record) => {
      return (
        <Button
          style={{
            padding: '0 5px',
            border:'none'

          }}
        >
          <span style={{margin:'0',marginTop:'-20px', fontSize:'25px', padding:'0' }} > <RightOutlined /></span>
        </Button>
      );
    },
  },
];

export { data, columns, sortList };
