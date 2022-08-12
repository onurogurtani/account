import {
  confirmDialog,
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomTable,
  errorDialog,
  successDialog,
  CustomSelect,
  Option,
  Text,
} from '../../../components';
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';
import React, { useCallback, useEffect, useState } from 'react';
import '../../../styles/draftOrder/draftList.scss';
import SchoolFormModal from './SchoolFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSchools, deleteSchool } from '../../../store/slice/schoolSlice';
import { FileExcelOutlined } from '@ant-design/icons';

const SchoolList = () => {

  const dispatch = useDispatch();

  const { schools } = useSelector((state) => state?.school);

  const [selectedSchool, setSelectedSchool] = useState("Hepsi");
  const [selectedRow, setSelectedRow] = useState(false);
  const [schoolFormModalVisible, setSchoolFormModalVisible] = useState(false);
  const [isExcel, setIsExcel] = useState(false);

  useEffect(() => {
    loadSchools();
  }, []);


  const loadSchools = useCallback(
    async () => {
      dispatch(getAllSchools());
    }
  );

  const handleDelete = async (record) => {
    confirmDialog({
        title: <Text t='attention' />,
        message: 'Kaydı silmek istediğinizden emin misiniz?',
        okText: <Text t='delete' />,
        cancelText: 'Vazgeç',
        onOk: async () => {
            let id = record.id;
            const action = await dispatch(deleteSchool({id}));
            if (deleteSchool.fulfilled.match(action)) {
                successDialog({
                    title: <Text t='successfullySent' />,
                    message: action?.payload?.message,
                    onOk: () => {},
                });
            } else {
                if (action?.payload?.message) {
                    errorDialog({
                        title: <Text t='error' />,
                        message: action?.payload?.message,
                    });
                }
            }
        },
    });

};


  const selectList = ["0", "1", "2", "Hepsi"];

  const columns = [
    {
      title: 'Kategori',
      dataIndex: 'schoolType',
      key: 'schoolType',
      render: (text, record) => {
        return (
          <div>{text}</div>
        )
      }
    },
    {
      title: 'Okul Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (
          <div>{text}</div>
        )
      }
    },
    {
      title: 'Okul Kodu',
      dataIndex: 'code',
      key: 'code',
      render: (text, record) => {
        return (
          <div>{text}</div>
        )
      }
    },
    {
      title: 'Durumu',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      render: (text, record) => {
        return (
          <div>{text}</div>
        )
      }
    },
    {
      title: 'İşlemler',
      dataIndex: 'draftDeleteAction',
      key: 'draftDeleteAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className='action-btns'>
            <CustomButton className="detail-btn" onClick={() => editFormModal(record)}>DÜZENLE</CustomButton>
            <CustomButton 
            className='delete-btn'
            onClick={() => handleDelete(record)}
            >SİL</CustomButton>
          </div>
        )
      }
    }
  ]

  const handleSelectChange = (value) => {
    console.log("VALUE>>>", value)
    setSelectedSchool(value)
  }

  const editFormModal = (record) => {
    setSelectedRow(record);
    setIsExcel(false);
    setSchoolFormModalVisible(true);
  };

  const addFormModal = () => {
    setSelectedRow(false);
    setIsExcel(false);
    setSchoolFormModalVisible(true);
  };

  const uploadExcel = () => {
    setIsExcel(true);
    setSelectedRow(false);
    setSchoolFormModalVisible(true);
  }

  const filteredSchool = schools.filter(school => {
    if (selectedSchool === "Hepsi") {
      return true;
    } else {
      return school.schoolType == selectedSchool;
    }
  })

  return (
    <CustomCollapseCard
      className='draft-list-card'
      cardTitle={<Text t='Okul Yönetimi' />}
    >
      <div className='number-registered-drafts'>
        <CustomButton className="add-btn" onClick={addFormModal}>
          YENİ OKUL EKLE
        </CustomButton>
        <div className='number-registered-drafts'>
          <CustomSelect showSearch
            style={{
              width: 300,
            }}
            placeholder="Okul Seçiniz..."
            value={selectedSchool}
            optionFilterProp="children"
            onChange={handleSelectChange}
            filterOption={(input, option) => option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())}
          >
            {
              selectList?.map((item) => <Option value={item}>{item}</Option>)
            }
          </CustomSelect>
        </div>
        <CustomButton className="upload-btn" onClick={uploadExcel} >
          <FileExcelOutlined />
          Excel ile Ekle
        </CustomButton>
        <div className='drafts-count-title'>
          <CustomImage src={cardsRegistered} />
          Kayıtlı Okul Sayısı: <span>{filteredSchool?.length}</span>
        </div>
      </div>

      <CustomTable
        pagination={true}
        dataSource={filteredSchool}
        columns={columns}
        rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
        scroll={{ x: false }}
      />
      <SchoolFormModal
        modalVisible={schoolFormModalVisible}
        handleModalVisible={setSchoolFormModalVisible}
        selectedRow={selectedRow}
        isExcel={isExcel}
      />
    </CustomCollapseCard>
  )
}

export default SchoolList