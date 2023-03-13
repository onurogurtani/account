import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import {
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomTable
} from '../../components';
import useOnchangeTable from '../../hooks/useOnchangeTable';
import usePaginationProps from '../../hooks/usePaginationProps';
import useTeacherListTableColumns from './hooks/useTeacherListTableColumns';
import TeacherListFilter from './TeacherListFilter';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/table.scss';
import '../../styles/teachers/teacherList.scss';

const TeacherList = () => {
  const history = useHistory();
  const { schools, filterObject, tableProperty, sorterObject } = useSelector((state) => state?.teachers);

  const paginationProps = usePaginationProps(tableProperty);
  const onChangeTable = useOnchangeTable({ filterObject, action: ()=>[] }); //TODO: set action
  const columns = useTeacherListTableColumns(sorterObject);

  const [isPackageFilter, setIsPackageFilter] = useState(false);

  const handleAddButton = ()=>{
    history.push('/teachers/add');
  }

  return (
    <CustomCollapseCard className="teacher-list-card" cardTitle="Öğretmenler">
      <div className="table-header">
        <Space>
          <CustomButton className="add-btn" onClick={handleAddButton}>
            YENİ EKLE
          </CustomButton>
          <CustomButton className="upload-btn">
            <FileExcelOutlined />
            Excel ile Ekle
          </CustomButton>
        </Space>
        <CustomButton
          data-testid="search"
          className="search-btn"
          onClick={() => setIsPackageFilter((prev) => !prev)}
        >
          <CustomImage src={iconSearchWhite} />
        </CustomButton>
      </div>
      {isPackageFilter && <TeacherListFilter />}
      <CustomTable
        dataSource={schools}
        columns={columns}
        pagination={paginationProps}
        rowKey={(record) => `teachers-${record?.id || record?.name}`}
        scroll={{ x: false }}
        onChange={onChangeTable}
      />
    </CustomCollapseCard>
  );
};

export default TeacherList;
