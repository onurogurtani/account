import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, CustomTable } from '../../../components';
import {
  getOrganisationTypes,
  selectOrganisationType,
  setOrganisationTypes,
  setSortedInfo,
} from '../../../store/slice/organisationTypesSlice';

const OrganisationTypesListTable = () => {
  const dispatch = useDispatch();
  const { organisationTypes, sortedInfo } = useSelector((state) => state.organisationTypes);

  useEffect(() => {
    dispatch(getOrganisationTypes());
  }, []);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Durumu',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      sorter: (a, b) => b.recordStatus - a.recordStatus,
      sortOrder: sortedInfo.columnKey === 'recordStatus' ? sortedInfo.order : null,
      render: (text, record) => {
        return <div>{text ? 'Aktif' : 'Pasif'}</div>;
      },
    },

    {
      title: 'Kurum Türü',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'tr'),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Açıklama',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
      sortOrder: sortedInfo.columnKey === 'description' ? sortedInfo.order : null,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'İşlemler',
      dataIndex: 'transactions',
      key: 'transactions',
      align: 'center',
      render: (text, record) => {
        return (
          <div className="action-btns">
            <CustomButton
              className="update-btn"
              onClick={() => {
                handleSelectOrganisationType(record?.id);
              }}
            >
              Güncelle
            </CustomButton>
          </div>
        );
      },
    },
  ];
  const handleSelectOrganisationType = useCallback(
    (id) => {
      dispatch(selectOrganisationType(id));
    },
    [dispatch],
  );
  function alphabetically(ascending) {
    return function (a, b) {
      // equal items sort equally

      if (a.description === b.description) {
        return 0;
      }

      // nulls sort after anything else
      if (a.description === undefined || a.description === null || a.description === '') {
        return 1;
      }
      if (b.description === undefined || b.description === null || b.description === '') {
        return -1;
      }

      // otherwise, if we're ascending, lowest sorts first
      if (ascending) {
        return a.description < b.description ? -1 : 1;
      }

      // if descending, highest sorts first
      return a.description < b.description ? 1 : -1;
    };
  }

  const onChangeTable = async (pagination, filters, sorter, extra) => {
    dispatch(setSortedInfo({ order: sorter?.order, columnKey: sorter?.columnKey }));
    if (extra?.action === 'sort') {
      if (sorter?.field === 'description') {
        switch (sorter?.order) {
          case 'ascend':
            await dispatch(setOrganisationTypes([...organisationTypes].sort(alphabetically(true))));
            break;
          case 'descend':
            await dispatch(setOrganisationTypes([...organisationTypes].sort(alphabetically(false))));
            break;
          default:
            await dispatch(setOrganisationTypes([...organisationTypes].sort((a, b) => b.id - a.id)));
            break;
        }
      } else {
        await dispatch(setOrganisationTypes([...organisationTypes].sort((a, b) => b.id - a.id)));
      }
    }
  };

  return (
    <CustomTable
      dataSource={organisationTypes}
      columns={columns}
      rowKey={(record) => `institutionTypesListTable-${record?.id}`}
      scroll={{ x: false }}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: {
          goButton: <CustomButton className="go-button">Git</CustomButton>,
        },
        position: 'bottomRight',
      }}
      onChange={onChangeTable}
    />
  );
};

export default OrganisationTypesListTable;
