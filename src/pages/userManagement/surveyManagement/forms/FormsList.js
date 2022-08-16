import { useEffect, useState } from 'react';
import {
    CustomCollapseCard,
    CustomImage,
    CustomButton,
    Text,
    CustomTable
} from '../../../../components';
import cardsRegistered from '../../../../assets/icons/icon-cards-registered.svg';
import '../../../../styles/draftOrder/draftList.scss';
import "../../../../styles/surveyManagement/surveyStyles.scss"
import { data, columns } from './static';

const FormsList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSelectChange = (newSelectedRowKeys, row) => {
        console.log('selectedRow changed: ', row);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <CustomCollapseCard
                className='draft-list-card'
                cardTitle={<Text t='Form Listesi' />}
            >
                <div className='number-registered-drafts'>
                    <div className='operations-buttons'>
                        <div className='sort-btn'>
                            <CustomButton type='secondary'>
                                <span className='sort'>
                                    <Text t='Sırala' />
                                </span>
                            </CustomButton>
                        </div>
                        <div className='filter-btn'>
                            <CustomButton type='secondary'>
                                <span className='filter-text'>
                                    <Text t='Filtrele' />
                                </span>
                            </CustomButton>
                        </div>
                        <CustomButton className="add-btn" >
                            YENİ ANKET OLUŞTUR
                        </CustomButton>
                    </div>
                    <div className='drafts-count-title'>
                        <CustomImage src={cardsRegistered} />
                        Kayıtlı Form Sayısı: <span>0</span>
                    </div>
                </div>
                <CustomTable
                    dataSource={data}
                    columns={columns}
                    rowKey={(record) => record.id}
                    scroll={{ x: false }}
                    pagination={true}
                    rowSelection={rowSelection}
                />

            </CustomCollapseCard>
        </>
    );
};

export default FormsList;