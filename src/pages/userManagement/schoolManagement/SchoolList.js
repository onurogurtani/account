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
import { getAllSchools, deleteSchool, getInstitutionTypes } from '../../../store/slice/schoolSlice';
import { FileExcelOutlined } from '@ant-design/icons';

const SchoolList = () => {
  const dispatch = useDispatch();

  const { schools, filterObject, tableProperty } = useSelector((state) => state?.school);

  const [selectedRow, setSelectedRow] = useState(false);
  const [schoolFormModalVisible, setSchoolFormModalVisible] = useState(false);
  const [isExcel, setIsExcel] = useState(false);
  const [institutionTypes, setInstitutionTypes] = useState([]);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = useCallback(async () => {
    dispatch(getAllSchools(filterObject));
  });

  useEffect(() => {
    loadInstitutionTypes();
  }, []);

  const loadInstitutionTypes = useCallback(async () => {
    const action = await dispatch(getInstitutionTypes());
    if (getInstitutionTypes.fulfilled.match(action)) {
      const institutionTypes = action?.payload?.data?.items;

      let obj = {};
      for (let index = 0; index < institutionTypes.length; index++) {
        const element = institutionTypes[index];
        obj = { ...obj, [element.id]: element.name };
      }

      setInstitutionTypes(obj);
    }
  }, [dispatch]);

  const handleDelete = async (record) => {
    confirmDialog({
      title: <Text t="attention" />,
      message: 'Kaydı silmek istediğinizden emin misiniz?',
      okText: <Text t="delete" />,
      cancelText: 'Vazgeç',
      onOk: async () => {
        let id = record.id;
        const action = await dispatch(deleteSchool({ id }));
        if (deleteSchool.fulfilled.match(action)) {
          successDialog({
            title: <Text t="successfullySent" />,
            message: action?.payload?.message,
            onOk: () => {},
          });
        } else {
          if (action?.payload?.message) {
            errorDialog({
              title: <Text t="error" />,
              message: action?.payload?.message,
            });
          }
        }
      },
    });
  };

  const selectList = [
    { value: true, text: 'Aktif' },
    { value: false, text: 'Pasif' },
    { value: 0, text: 'Hepsi' },
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Okul Adı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Okul Tipi',
      dataIndex: 'institutionTypeId',
      key: 'institutionTypeId',
      render: (text, record) => {
        return <div>{institutionTypes[record.institutionTypeId]}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      render: (text, record) => {
        return (
          <div>
            {record.recordStatus === 1 ? (
              <span className="status-text-active">Aktif</span>
            ) : (
              <span className="status-text-passive">Pasif</span>
            )}
          </div>
        );
      },
    },
    {
      title: 'İşlemler',
      dataIndex: 'schoolDeleteAction',
      key: 'schoolDeleteAction',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton className="detail-btn" onClick={() => editFormModal(record)}>
              DÜZENLE
            </CustomButton>
            <CustomButton className="delete-btn" onClick={() => handleDelete(record)}>
              SİL
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const handleSelectChange = async (value) => {
    if (value === 0) {
      await dispatch(
        getAllSchools({
          ...filterObject,
          recordStatus: undefined,
          allRecords: true,
          pageNumber: 1,
        }),
      );
      return;
    }
    await dispatch(
      getAllSchools({ ...filterObject, allRecords: undefined, recordStatus: value, pageNumber: 1 }),
    );
  };

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
  };

  const handleTableChange = async ({ pageSize, current }, filters, sorter) => {
    await dispatch(getAllSchools({ ...filterObject, pageNumber: current, pageSize }));
  };
  return (
    <CustomCollapseCard className="draft-list-card" cardTitle={<Text t="Okul Yönetimi" />}>
      <div className="number-registered-drafts">
        <CustomButton className="add-btn" onClick={addFormModal}>
          YENİ OKUL EKLE
        </CustomButton>
        <div className="number-registered-drafts">
          <CustomSelect
            style={{
              width: 260,
            }}
            placeholder="Seçiniz..."
            value={filterObject?.allRecords ? 0 : filterObject?.recordStatus}
            optionFilterProp="children"
            onChange={handleSelectChange}
            filterOption={(input, option) =>
              option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            }
          >
            {selectList?.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.text}
              </Option>
            ))}
          </CustomSelect>
        </div>
        <CustomButton className="upload-btn" onClick={uploadExcel}>
          <FileExcelOutlined />
          Excel ile Ekle
        </CustomButton>
        <div className="drafts-count-title">
          <CustomImage src={cardsRegistered} />
          Kayıtlı Okul Sayısı: <span>{tableProperty?.totalCount}</span>
        </div>
      </div>

      <CustomTable
        pagination={{
          current: tableProperty?.currentPage,
          pageSize: tableProperty?.pageSize,
          total: tableProperty?.totalCount,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        dataSource={schools}
        columns={columns}
        rowKey={(record) => `school-list-new-order-${record?.id || record?.name}`}
        scroll={{ x: false }}
      />
      <SchoolFormModal
        modalVisible={schoolFormModalVisible}
        handleModalVisible={setSchoolFormModalVisible}
        selectedRow={selectedRow}
        isExcel={isExcel}
      />
    </CustomCollapseCard>
  );
};

export default SchoolList;
