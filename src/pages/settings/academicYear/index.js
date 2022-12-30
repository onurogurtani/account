import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomButton,
  CustomCollapseCard,
  CustomModal,
  CustomPageHeader,
  CustomTable,
  CustomImage,
} from '../../../components';
import {
  closeModal,
  getEducationYearList,
  openModal,
  selectEducationYear,
} from '../../../store/slice/educationYearsSlice';
import '../../../styles/table.scss';
import '../../../styles/prefencePeriod/prefencePeriod.scss';
import modalClose from '../../../assets/icons/icon-close.svg';
import usePaginationProps from '../../../hooks/usePaginationProps';
import { dateFormat } from '../../../utils/keys';
import dayjs from 'dayjs';
import AcademicYearForm from './AcademicYearForm';

const selectedEducationYearSelector = (state) => {
  const { educationYearList, selectedEducationYearId } = state.educationYears;
  if (selectedEducationYearId) {
    const educationYear = educationYearList.items.find((item) => item.id === selectedEducationYearId);
    return { ...educationYear, startDate: dayjs(educationYear?.startDate), endDate: dayjs(educationYear?.endDate) };
  }
  return null;
};

const AcademicYear = () => {
  const dispatch = useDispatch();
  const { educationYearList } = useSelector((state) => state.educationYears);
  const paginationProps = usePaginationProps(educationYearList?.pagedProperty);
  const { isOpenModal, selectedEducationYearId } = useSelector((state) => state.educationYears);
  const selectedEducationYear = useSelector(selectedEducationYearSelector);

  useEffect(() => {
    dispatch(getEducationYearList());
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const columns = [
    {
      title: 'Eğitim Öğretim Yılı',
      dataIndex: 'startYear',
      key: 'startYear',
      width: 90,
      render: (text, record) => {
        return (
          <div>
            {text} - {record?.endYear}
          </div>
        );
      },
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 90,
      render: (text, record) => {
        return <div>{dayjs(text)?.format(dateFormat)}</div>;
      },
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 90,
      render: (text, record) => {
        return <div>{dayjs(text)?.format(dateFormat)}</div>;
      },
    },
    {
      title: 'İŞLEMLER',
      dataIndex: 'draftDeleteAction',
      key: 'draftDeleteAction',
      width: 100,
      align: 'center',
      render: (_, record) => {
        return (
          <div className="action-btns-academic-year">
            <CustomButton
              onClick={() => {
                handleSelectEducationYear(record?.id);
              }}
              className="detail-btn"
            >
              DÜZENLE
            </CustomButton>
          </div>
        );
      },
    },
  ];

  const handleSelectEducationYear = useCallback(
    (id) => {
      dispatch(selectEducationYear(id));
    },
    [dispatch],
  );

  return (
    <CustomPageHeader title="Tercih Dönemi Eğitim Yılı" showBreadCrumb routes={['Ayarlar']}>
      <CustomCollapseCard cardTitle="Tercih Dönemi Eğitim Yılı">
        <div className="table-header">
          <CustomButton
            className="add-btn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            Yeni
          </CustomButton>
        </div>
        <CustomTable
          pagination={paginationProps}
          onChange={(e) => {
            dispatch(getEducationYearList({ params: { PageSize: e.pageSize, PageNumber: e.current } }));
          }}
          dataSource={educationYearList?.items}
          columns={columns}
          rowKey={(record) => `academicYear-${record?.id || record?.name}`}
          scroll={{ x: false }}
        />
        <CustomModal
          className="academicYear-modal"
          maskClosable={false}
          visible={isOpenModal}
          footer={false}
          title={<>Tercih Dönemi Eğitim Öğretim Yılı {selectedEducationYearId ? 'Güncelleme' : 'Tanımalama'} Ekranı</>}
          onCancel={handleClose}
          width={700}
          closeIcon={<CustomImage src={modalClose} />}
        >
          <AcademicYearForm educationYear={selectedEducationYear} onCancel={handleClose} />
        </CustomModal>
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default AcademicYear;
