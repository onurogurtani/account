import { Tag } from 'antd';

const columns = [
  {
    title: 'VİDEO KODU',
    dataIndex: 'kalturaVideoId',
    key: 'kalturaVideoId',
    sorter: true,
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'DURUM',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (text, record) => {
      return (
        <div>
          {record.isActive ? (
            <Tag color="green" key={1}>
              Aktif
            </Tag>
          ) : (
            <Tag color="red" key={2}>
              Pasif
            </Tag>
          )}
        </div>
      );
    },
  },
  {
    title: 'KATEGORİ',
    dataIndex: 'videoCategory',
    key: 'videoCategory',
    sorter: true,
    render: (text, record) => {
      return <div>{text.name}</div>;
    },
  },
  {
    title: 'BAĞLI OLDUĞU PAKET',
    dataIndex: 'packages',
    key: 'packages',
    sorter: true,
    render: (_, record) => (
      <>
        {record.packages?.map((item, id) => {
          return (
            <Tag className="m-1" color="blue" key={id}>
              {item.package.name}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'DERS',
    dataIndex: 'lesson',
    key: 'lesson',
    sorter: true,
    render: (text, record) => {
      return <div>{text.name}</div>;
    },
  },
  {
    title: 'ÜNİTE',
    dataIndex: 'lessonUnit',
    key: 'lessonUnit',
    sorter: true,
    render: (text, record) => {
      return <div>{text.name}</div>;
    },
  },
  {
    title: 'KONU',
    dataIndex: 'lessonSubject',
    key: 'lessonSubject',
    sorter: true,
    render: (text, record) => {
      return <div>{text.name}</div>;
    },
  },
  {
    title: 'ALT BAŞLIK',
    dataIndex: 'lessonSubSubjects',
    key: 'lessonSubSubjects',
    sorter: true,
    render: (_, record) => (
      <>
        {record.lessonSubSubjects?.map((item, id) => {
          return (
            <Tag className="m-1" color="gold" key={id}>
              {item.lessonSubSubject.name}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const sortFields = {
  kalturaVideoId: { ascend: 'KalturaVideoIdASC', descend: 'KalturaVideoIdDESC' },
  videoCategory: { ascend: 'CategoryASC', descend: 'CategoryDESC' },
  packages: { ascend: 'PackageASC', descend: 'PackageDESC' },
  lesson: { ascend: 'LessonASC', descend: 'LessonDESC' },
  lessonUnit: { ascend: 'LessonUnitASC', descend: 'LessonUnitDESC' },
  lessonSubject: { ascend: 'LessonSubjectASC', descend: 'LessonSubjectDESC' },
  lessonSubSubjects: { ascend: 'LessonSubSubjectASC', descend: 'LessonSubSubjectDESC' },
};
export { columns, sortFields };
