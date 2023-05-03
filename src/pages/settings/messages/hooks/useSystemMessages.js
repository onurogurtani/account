import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';
import { capitalizeFirstLetter, downloadFile } from '../../../../utils/utils';


const useSystemMessages = (loadDidMount) => {
    const [systemMessages, setSystemMessages] = useState([]);
    const [lastRequestPayload, setLastRequestPayload] = useState({});

    const [pagination, setPagination] = useState({
        showQuickJumper: true,
        position: 'bottomRight',
        showSizeChanger: true,
    });

    useEffect(() => {
        if (loadDidMount) {
            loadMessages();
        }
    }, [loadDidMount]);

    /**
     * 
     * @param {*} payload payload is required model => { currentPage, pageSize,  filters:[{
     * columnName:string,
     *  value:string 
     * }],
     * orderColumnName,
     * orderType,
     * }
     */
    const loadMessages = async (payload) => {
        try {
            let orderBy = '';
            if (payload && payload.orderColumnName && payload.orderType) {
                orderBy = capitalizeFirstLetter(payload.orderColumnName) + (payload.orderType === 'ascend' ? 'ASC' : 'DESC');
            }
            const requestPayload = {
                pageNumber: payload?.currentPage || 1,
                pageSize: payload?.pageSize || 10,
                queryDto: payload?.filters ? payload.filters.map((filter) => {
                    return { field: filter.columnName, text: filter.value };
                }) : [],
                orderBy,
            };
            const response = await api.post('Account/MessageMaps/getPagedList', {
                messageMapDetailSearchDto: requestPayload
            });
            if (response.success) {
                setPagination({
                    ...pagination,
                    pageSize: response.data.pagedProperty?.pageSize,
                    total: response.data.pagedProperty?.totalCount,
                });
                setSystemMessages(response.data.items);
                setLastRequestPayload(requestPayload);
            }

        } catch (error) {

            console.error(error);
        }
    }

    const downloadMessages = async () => {
        try {
            const response = await api.post('Account/MessageMaps/downloadFile', {
                messageMapDetailSearchDto: lastRequestPayload
            }, { responseType: 'arraybuffer', });
            downloadFile({ data: response, fileName: "Hata ve Uyarı Mesajları" });
        } catch (error) {
            console.error(error);
        }
    }

    const saveChange = async (id, message) => {
        try {
            if (typeof id === 'number' && typeof message === 'string' && message) {
                const response = await api.put('Account/MessageMaps', {
                    id: id,
                    message: message,
                });
                return response.success;
            }
            else {
                console.warn('Cannot be accept model => saveChange => ', id, message);
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }


    return { loadMessages, systemMessages, pagination, downloadMessages, saveChange }
}

export default useSystemMessages;