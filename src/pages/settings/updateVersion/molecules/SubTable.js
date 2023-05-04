import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomTable } from '../../../../components';

const SubTable = ({ getVersionDifData, record }) => {
    const [tableData, settableData] = useState([]);

    const getData = async () => {
        let data = await getVersionDifData(record);
        console.log('data', data);
        settableData(data);
    };
    useEffect(() => {
        getData();
    }, [record]);

    let columns = [
        {
            title: 'Önceki Id',
            dataIndex: 'lgsPreferenceSchoolRawPreviousId',
            key: 'lgsPreferenceSchoolRawPreviousId',
        },
        {
            title: 'Sonraki Id',
            dataIndex: 'lgsPreferenceSchoolRawCurrentId',
            key: 'lgsPreferenceSchoolRawCurrentId',
        },
        {
            title: 'Önceki Veri',
            dataIndex: 'lgsPreferenceSchoolRawContentPrevious',
            key: 'lgsPreferenceSchoolRawContentPrevious',
        },
        {
            title: 'Güncel Veri',
            dataIndex: 'lgsPreferenceSchoolRawContentCurrent',
            key: 'lgsPreferenceSchoolRawContentCurrent',
        },
    ];
    // if (record?.yokType === 2) {
    //     columns = [
    //         {
    //             title: 'Yop Kodu',
    //             dataIndex: 'code',
    //             key: 'code',
    //         },
    //         ...columns,
    //     ];
    // }

    return (
        <>
            {tableData?.length > 0 ? (
                <CustomTable
                    columns={columns}
                    dataSource={tableData || []}
                    pagination={false}
                    scroll={{ y: 500 }}
                    rowKey={(record) => (record.id ? `${record?.id}` : `${record?.headText}`)}
                />
            ) : (
                <p>Değişen herhangi bir veri bulunmamaktadır.</p>
            )}
        </>
    );
};

export default SubTable;

// const CartLines = () => {
//     const dispatch = useDispatch();
//     const { cart, isFetching } = useSelector((state) => state.cart);

//     const [expandedRowKeys, setExpandedRowKeys] = useState([]);

//     useEffect(() => {
//         dispatch(getCart());
//     }, []);

//     const deleteCartLine = (id) => {
//         modals.confirm('Silme İşlemi', 'Sepetinizden silmek istediğinize emin misiniz?', {
//             icon: <InfoCircleOutlined />,
//             handleOk: async () => {
//                 const action = await dispatch(deleteCartLines(id));
//                 if (deleteCartLines.fulfilled.match(action)) {
//                     dispatch(getCheckout());
//                     dispatch(getCart());
//                     return notifications.success('Sepetiniz başarıyla güncelllendi.');
//                 }
//                 return notifications.error('Silme işlemi başarısız oldu.');
//             },
//         });
//     };

//     return (
//         <>
//             <CartLinesTitle>
//                 Sepetim <span>{`${cart?.cartLines?.length || 0} istek`}</span>
//             </CartLinesTitle>
//             <EtaTable
//                 className="ant-header-table ant-table-single"
//                 dataSource={cart?.cartLines}
//                 pagination={false}
//                 rowKey={(row) => row.cartLineId}
//                 expandedRowKeys={expandedRowKeys}
//                 loading={isFetching}
//                 expandable={{
//                     expandedRowRender: (record) => <CartDetail />,
//                     expandIcon: ({ expanded, onExpand, record }) =>
//                         expanded ? (
//                             <MinusCircleTwoTone
//                                 style={{ fontSize: '16px' }}
//                                 onClick={(e) => {
//                                     setExpandedRowKeys([]);
//                                     return onExpand(record, e);
//                                 }}
//                             />
//                         ) : (
//                             <PlusCircleTwoTone
//                                 style={{ fontSize: '16px' }}
//                                 onClick={(e) => {
//                                     dispatch(getQuotesById(record?.quoteId));
//                                     setExpandedRowKeys([record?.cartLineId]);
//                                     return onExpand(record, e);
//                                 }}
//                             />
//                         ),
//                 }}
//                 columns={[
//                     EtaTable.EXPAND_COLUMN,
//                     {
//                         title: 'Yükleme Tarihi',
//                         dataIndex: 'pickupDate',
//                         key: 'pickupDate',
//                         width: 150,
//                         render: (text, row) => (
//                             <>
//                                 <div>{row?.vehicleProperty}</div>
//                                 <div>{text}</div>
//                             </>
//                         ),
//                     },
//                     {
//                         title: 'Rota Bilgileri',
//                         dataIndex: 'departureLocation',
//                         key: 'departureLocation',
//                         width: 200,
//                         render: (text, row) => (
//                             <>
//                                 <div>{`Yükleme; ${text}`}</div>
//                                 <div>{`Yük Boşaltma; ${row?.arrivalLocation}`}</div>
//                             </>
//                         ),
//                     },
//                     {
//                         title: 'Yük Özellikleri',
//                         dataIndex: 'freightProperty',
//                         key: 'freightProperty',
//                         render: (text, row) => <div className="loadSpecifications">{text}</div>,
//                     },
//                     {
//                         title: 'Araç Adedi',
//                         dataIndex: 'quantity',
//                         key: 'quantity',
//                         align: 'center',
//                     },
//                     {
//                         title: 'Fiyat',
//                         dataIndex: 'totalText',
//                         key: 'totalText',
//                         width: 200,
//                         align: 'center',
//                     },
//                     {
//                         title: '',
//                         dataIndex: 'actions',
//                         key: 'actions',
//                         fixed: 'right',
//                         render: (_, row) => (
//                             <Tooltip title="Sil">
//                                 <EtaButton
//                                     type="danger-outline"
//                                     icon={<DeleteOutlined />}
//                                     onClick={() => deleteCartLine(row?.cartLineId)}
//                                 ></EtaButton>
//                             </Tooltip>
//                         ),
//                     },
//                 ]}
//             />
//         </>
//     );
// };
