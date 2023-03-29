import { Space, Tooltip } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { memo } from 'react';
import { confirmDialog, errorDialog, Text } from '../../../components';

const Toolbar = ({
    addText,
    editText,
    isActive,
    statusAction,
    statusText,
    open,
    setIsEdit,
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
                    statusAction().catch((e) => errorDialog({ title: <Text t="error" />, message: e?.message }));
                },
            });
        } else {
            statusAction().catch((e) => errorDialog({ title: <Text t="error" />, message: e?.message }));
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
