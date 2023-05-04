import React, { useState } from 'react';
import { CustomCollapseCard, Text, CustomButton, CustomTable } from '../../../components';
import CoefficientFormModal from './CoefficientFormModal';
import { dummyCoefficients, ADD, COPY, UPDATE } from '../../../constants/settings/coefficients';
import '../../../styles/settings/coefficient.scss';

const CoefficientList = () => {
    const [coefficientFormModalVisible, setCoefficientFormModalVisible] = useState(false);
    const [operationType, setOperationType] = useState("");
    const [selectedCoefficientData, setSelectedCoefficientData] = useState({})

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Versiyon',
            dataIndex: 'version',
            key: 'version',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'Sınav Türü',
            dataIndex: 'examType',
            key: 'examType',
            render: (text, record) => {
                return <div>{text}</div>;
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'coefficientActions',
            key: 'coefficientActions',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className="action-btns">
                        <CustomButton className="detail-btn" onClick={() => handleClickButton(record, UPDATE)}>
                            GÜNCELLE
                        </CustomButton>
                        <CustomButton className='copy-btn' onClick={() => handleClickButton(record, COPY)}>
                            KOPYALA
                        </CustomButton>
                    </div>
                );
            },
        },
    ];

    const addFormModal = () => {
        setOperationType(ADD);
        setCoefficientFormModalVisible(true);
    };
    const handleClickButton = (record, type) => {
        setOperationType(type);
        setSelectedCoefficientData(record)
        setCoefficientFormModalVisible(true);
    };

    return (
        <CustomCollapseCard cardTitle={<Text t="Katsayı Tanımlama" />}>
            <div className='coefficient-list-container'>
                <CustomButton className="add-btn" onClick={addFormModal}>
                    Katsayı Ekle
                </CustomButton>
            </div>
            <CustomTable
                dataSource={dummyCoefficients}
                columns={columns}
                rowKey={(record) => `${record?.id}`}
                locale={{ emptyText: 'Sisteme tanımlanmış katsayı bilgisi bulunmamaktadır. "Katsayı Ekle" butonuna tıklayarak ekleyebilirsiniz.' }}
            />
            <CoefficientFormModal
                operationType={operationType}
                modalVisible={coefficientFormModalVisible}
                selectedCoefficientData={selectedCoefficientData}
                handleModalVisible={setCoefficientFormModalVisible}
            />
        </CustomCollapseCard>
    );
};

export default CoefficientList;
