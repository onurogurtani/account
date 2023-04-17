import { useState } from 'react';
import { CustomButton, CustomPageHeader } from '../../../components';
import MessageList from './MessageList';
import useSystemMessages from './hooks/useSystemMessages';

const routes = ['Ayarlar'];

export const Messages = () => {

    const { systemMessages, pagination, loadMessages, downloadMessages, saveChange } = useSystemMessages(true);
    const [changedRows, setChangedRows] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);

    const onChangeMessage = (e, currentRow) => {
        const newMessage = e?.target?.value;
        if (changedRows.find((r) => r.code === currentRow.code)) {
            setChangedRows(changedRows.map((x) => {
                const newRow = { ...x };
                if (x.code == currentRow.code) {
                    newRow.message = newMessage;
                }
                return newRow;
            })
            );
        }
        else {
            setChangedRows([...changedRows, { ...currentRow, message: newMessage }]);
        }
    }

    const onChangeTable = (pagination, filters, sorter) => {
        const _filters = typeof filters === "object" ? Object.keys(filters).map((key) => {
            return { columnName: key, value: filters[key]?.[0] }
        }).filter((x) => x.value) : [];

        const paylaod = {
            currentPage: pagination?.current,
            pageSize: pagination?.pageSize,
            filters: _filters,
            orderColumnName: sorter?.field,
            orderType: sorter?.order,
        }
        loadMessages(paylaod);
    }

    const onExportToExcel = () => {
        downloadMessages();
    }

    const onSave = async (event, row) => {
        setInProgressItems([...inProgressItems, row]);
        const changedRow = changedRows.find((r) => r.code === row.code);
        await saveChange(Number(changedRow.id), changedRow.message);
        loadMessages();
        setInProgressItems([...inProgressItems]);
    }

    return (
        <CustomPageHeader
            title="Hata ve Uyarı Mesajları"
            routes={routes}
            showBreadCrumb
        >
            <CustomButton
                key={"actionDownloadFile"}
                onClick={onExportToExcel}>
                Excel Olarak İndir
            </CustomButton>
            <MessageList
                changedRows={changedRows}
                inProgressItems={inProgressItems}
                items={systemMessages}
                pagination={pagination}
                onChangeMessage={onChangeMessage}
                onChangeTable={onChangeTable}
                onSave={onSave}
            />
        </CustomPageHeader>
    );
}

export default Messages;