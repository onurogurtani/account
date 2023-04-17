import React from 'react';
import { CustomButton, CustomInput, CustomTable } from '../../../components';

const MessageList = ({ items, pagination, changedRows, onChangeTable, onSave, onChangeMessage, inProgressItems }) => {
    const columns = [
        {
            title: 'Mesaj Kodu',
            dataIndex: 'code',
            key: 'code',
            sorter: true,
            filterable: true,
        },
        {
            title: 'Mesajın Kullanıldığı Yer',
            dataIndex: 'usedClass',
            key: 'usedClass',
            sorter: true,
            filterable: true,

        },
        {
            title: 'Kullanıcıya Gösterilen Mesaj',
            dataIndex: 'message',
            key: 'message',
            sorter: true,
            filterable: true,
            render: (text, row) => {
                let _text = changedRows.find((r) => r.code === row?.code)?.message;
                _text = typeof _text === 'undefined' ? row.message : _text;
                let disabled = inProgressItems.find((i) => i.code === row.code) ? true : false;
                return <CustomInput disabled={disabled} value={_text} onChange={onChangeMessage} externalData={row} />
            }

        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, row) => {

                if (changedRows.find((r) => r.code === row.code && r.message != row.message && r.message)) {
                    let loading = inProgressItems.find((i) => i.code === row.code) ? true : false;
                    return <CustomButton loading={loading} onClick={onSave} externalData={row}>Kaydet</CustomButton>;
                }
            },
        },
    ];



    return (
        <CustomTable
            dataSource={items}
            pagination={pagination}
            columns={columns}
            onChange={onChangeTable}
            rowKey="code"
        />
    );
};

export default MessageList;
