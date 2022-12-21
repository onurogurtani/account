import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import React from 'react';

const Toolbar = ({ addText, editText, deleteText, open, setIsAdd, setIsEdit, deleteAction, hidePlusButton }) => {
  return (
    <Space align="center">
      {hidePlusButton ? null : (
        <Tooltip title={addText}>
          <PlusCircleOutlined
            onClick={(event) => {
              if (open) event.stopPropagation();
              setIsAdd(true);
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

export default Toolbar;
