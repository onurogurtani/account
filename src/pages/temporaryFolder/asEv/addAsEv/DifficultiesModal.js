import React, { useEffect } from 'react';
import { CustomModal, CustomTable } from '../../../../components';
import '../../../../styles/temporaryFile/asEv.scss';
//TODO DUMMY DATA KULLNILARAK TABLDA GÖSTERİLECEK VERİLER(BE DEN GELEN) BURADA DATA OLUŞTURMAK LAZIM
const dummyTableData = [
  {
    id: 0,
    subject: 'dairesel atışlar',
    difficulty1: '0',
    difficulty2: '0',
    difficulty3: '2',
    difficulty4: '0',
    difficulty5: '0',
  },
];
const columns = [
  {
    title: '',
    dataIndex: 'subject',
    key: 'subject',
    width: 200,

    // align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Zorluk 1',
    dataIndex: 'difficulty1',
    key: 'difficulty1',
    align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Zorluk 2',
    dataIndex: 'difficulty2',
    key: 'difficulty2',
    align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Zorluk 3',
    dataIndex: 'difficulty3',
    key: 'difficulty3',
    align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Zorluk 4',
    dataIndex: 'difficulty4',
    key: 'difficulty4',
    align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Zorluk 5',
    dataIndex: 'difficulty5',
    key: 'difficulty5',
    align: 'center',
    render: (text, record) => {
      return <div>{text}</div>;
    },
  },
];

const DifficultiesModal = ({
  initialValues,
  isVisible,
  setIsVisible,
  setStep,
  step,
  disabled,
  setDisabled,
  difficultiesData,
  subjects,
}) => {
  useEffect(() => {
    const relevantSubj = subjects.filter((item) => item.id === difficultiesData?.lessonId);
    const difficultyObj = {};
    Object.keys(difficultiesData).forEach((key) => {
      if (key.includes('questionCountOfDifficulty')) {
        if (difficultiesData[key] === undefined) {
          difficultyObj[key] = 0;
        } else {
          difficultyObj[key] = Number(difficultiesData[key]);
        }
      }
    });
  }, [difficultiesData]);

  const onOk = async () => {
    //TODO BURADA BE TARAFINDA İSTEK ATIP SORULARI ÇEKMEK LAZIM
    setIsVisible(false);
    // if (initialValues) {
    //   setDisabled(false);
    // }
    setStep('2');
  };
  const onCancel = async () => {
    setIsVisible(false);
  };
  return (
    <CustomModal
      visible={isVisible}
      //   title={selectedAnnouncementTypeId ? 'Duyuru Tipi Güncelle' : 'Yeni Duyuru Tipi Ekleme'}
      title={'Ölçme Değerlendirme Testi Konu Zorlukları'}
      okText={'Soruları Göster'}
      cancelText={'Vazgeç'}
      onCancel={onCancel}
      onOk={onOk}
      className="difficulty-modal"
    >
      <CustomTable
        dataSource={dummyTableData}
        columns={columns}
        pagination={false}
        // scroll={{
        //   y: 750,
        //   x: 750,
        // }}
        scroll={false}
        style={{ width: '1000px' }}
      />
    </CustomModal>
  );
};

export default DifficultiesModal;
