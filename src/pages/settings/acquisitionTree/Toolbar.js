import { Space, Tooltip } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { confirmDialog, Text } from '../../../components';

const Toolbar = ({
    addText,
    editText,
    deleteText,
    isActive,
    statusAction,
    statusText,
    open,
    setIsEdit,
    deleteAction,
    hidePlusButton,
    setSelectedInsertKey,
    selectedKey,
}) => {
    const statusOnClick = (event) => {
        event.stopPropagation();
        if (isActive) {
            confirmDialog({
                title: <Text t="attention" />,
                message: statusText,
                okText: <Text t="Evet" />,
                cancelText: 'Hayır',
                onOk: async () => {
                    statusAction();
                },
            });
        } else {
            statusAction();
        }
    };
    return (
        <Space align="center" style={{ marginLeft: 'auto' }}>
            <span onClick={statusOnClick} style={{ fontSize: '14px' }}>
                {isActive ? 'Pasif Et' : 'Aktif Et'}
            </span>

            <Tooltip title={editText}>
                <EditOutlined
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsEdit(true);
                    }}
                />
            </Tooltip>

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
        </Space>
    );
};

export default memo(Toolbar);
