import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Space } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import {
  CustomButton,
  CustomCollapseCard,
  CustomImage,
} from '../../components';
import TeacherListFilter from './TeacherListFilter';
import TeacherListTable from './TeacherListTable';
import iconSearchWhite from '../../assets/icons/icon-white-search.svg';
import '../../styles/table.scss';
import '../../styles/teachers/teacherList.scss';

const TeacherList = () => {
  const refFilterDiv = useRef();
  const history = useHistory();

  const [isVisibleFilter, setIsVisibleFilter] = useState(false);

  const handleAddButton = () => {
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
          onClick={() =>
            setIsVisibleFilter((prev) => {
              refFilterDiv.current.style.display = prev ? 'none' : 'block';
              return !prev;
            })
          }
        >
          <CustomImage src={iconSearchWhite} />
        </CustomButton>
      </div>
      <div ref={refFilterDiv} style={{ display: 'none' }}>
        <TeacherListFilter isVisibleFilter={isVisibleFilter} />
      </div>
      <TeacherListTable />
    </CustomCollapseCard>
  );
};

export default TeacherList;
