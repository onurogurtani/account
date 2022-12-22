import { Space, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { memo } from 'react';

const Toolbar = ({
  addText,
  editText,
  deleteText,
  open,
  setIsEdit,
  deleteAction,
  hidePlusButton,
  setSelectedInsertKey,
  selectedKey,
}) => {
  return (
    <Space align="center" style={{ marginLeft: 'auto' }}>
      {hidePlusButton ? null : (
        <Tooltip title={addText}>
          <PlusCircleOutlined
            onClick={(event) => {
              if (open) event.stopPropagation();
              setSelectedInsertKey(selectedKey);
            }}
          />
        </Tooltip>
      )}

      <Tooltip title={editText}>
        <EditOutlined
          onClick={(event) => {
            event.stopPropagation();
            setIsEdit(true);
          }}
        />
      </Tooltip>
      <Tooltip title={deleteText}>
        <DeleteOutlined
          onClick={(event) => {
            event.stopPropagation();
            deleteAction();
          }}
          style={{ color: 'red' }}
        />
      </Tooltip>
    </Space>
  );
};

export default memo(Toolbar);
