import React, { useState } from 'react';
import {
  CustomButton,
  CustomCollapseCard,
  CustomImage,
  CustomPageHeader,
} from '../../../components';
import UserFilter from './UserFilter';
import iconFilter from '../../../assets/icons/icon-filter.svg';
import '../../../styles/table.scss';

const UserList = () => {
  const [isUserFilter, setIsUserFilter] = useState(false);

  return (
    <CustomPageHeader title="Üye Listesi" showBreadCrumb showHelpButton routes={['Üye Yönetimi']}>
      <CustomCollapseCard cardTitle="Üye Listesi">
        <div className="table-header">
          <CustomButton
            className="add-btn"
            //   onClick={addEvent}
          >
            YENİ EKLE
          </CustomButton>
          <CustomButton
            data-testid="search"
            className="search-btn"
            onClick={() => setIsUserFilter((prev) => !prev)}
          >
            <CustomImage src={iconFilter} />
          </CustomButton>
        </div>
        {isUserFilter && <UserFilter />}
        {/* <CustomTable
          dataSource={events}
          onChange={onChangeTable}
          className="event-table-list"
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => showEvent(record),
            };
          }}
          pagination={paginationProps}
          rowKey={(record) => `user-list-${record?.id}`}
          scroll={{ x: false }}
        /> */}
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default UserList;
