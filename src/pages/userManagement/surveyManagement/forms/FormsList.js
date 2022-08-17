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
import FilterFormModal from './FilterModal';
import SortFormModal from './SortModal';

const FormsList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isSortVisible, setIsSortVisible] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSelectChange = (newSelectedRowKeys, row) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const action = (row, actionName) => {
        console.log("row", row)
        console.log("actionName", actionName)
    }

    return (
        <>
            <CustomCollapseCard
                className='draft-list-card'
                cardTitle={<Text t='Form Listesi' />}
            >
                <div className='number-registered-drafts'>
                    <div className='operations-buttons'>
                        <div className='filter-btn'>
                            <CustomButton type='secondary' onClick={() => setIsVisible(true)}>
                                <span className='filter-text'>
                                    <Text t='Filtrele' />
                                </span>
                            </CustomButton>
                        </div>
                        <div className='sort-btn'>
                            <CustomButton type='secondary' onClick={() => setIsSortVisible(true)}>
                                <span className='sort'>
                                    <Text t='Sırala' />
                                </span>
                            </CustomButton>
                        </div>
                        <CustomButton className="add-btn" >
                            YENİ ANKET OLUŞTUR
                        </CustomButton>
                    </div>
                    <div className='drafts-count-title'>
                        <CustomImage src={cardsRegistered} />
                        Kayıtlı Form Sayısı: <span>{data?.length}</span>
                    </div>
                </div>
                <CustomTable
                    dataSource={data}
                    columns={columns(action)}
                    rowKey={(record) => record.id}
                    scroll={{
                        x: 1300,
                    }}
                    pagination={true}
                    rowSelection={rowSelection}
                    footer={() => (
                        selectedRowKeys.length > 0 && (
                            <div className='footer-buttons'>
                                <div className='delete-btn'>
                                    <CustomButton type='secondary'>
                                        <span className='sort'>
                                            <Text t='Seçilenleri Sil' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='remove-btn'>
                                    <CustomButton type='secondary'>
                                        <span className='filter-text'>
                                            <Text t='Seçilenleri Sonlandır/Yayından Kaldır' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='active-btn'>
                                    <CustomButton type='secondary'>
                                        <span className='filter-text'>
                                            <Text t='Aktifleştir/Yayınla' />
                                        </span>
                                    </CustomButton>
                                </div>
                            </div>)
                    )}
                />
                <FilterFormModal
                    modalVisible={isVisible}
                    handleModalVisible={setIsVisible}
                />
                <SortFormModal
                    modalVisible={isSortVisible}
                    handleModalVisible={setIsSortVisible}
                />

            </CustomCollapseCard>
        </>
    );
};

export default FormsList;