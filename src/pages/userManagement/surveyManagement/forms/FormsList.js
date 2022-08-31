import { useEffect, useState } from 'react';
import {
    CustomCollapseCard,
    CustomImage,
    CustomButton,
    Text,
    CustomTable,
    successDialog,
    confirmDialog,
    errorDialog
} from '../../../../components';
import cardsRegistered from '../../../../assets/icons/icon-cards-registered.svg';
import '../../../../styles/draftOrder/draftList.scss';
import "../../../../styles/surveyManagement/surveyStyles.scss"
import { columns } from './static';
import FilterFormModal from './FilterModal';
import SortFormModal from './SortModal';
import AddFormModal from './FormModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    getForms,
    deleteForm,
    activeForm,
    passiveForm,
    getFormCategories,
    getTargetGroup,
    getSurveyConstraint
} from '../../../../store/slice/formsSlice'

const FormsList = () => {


    const emptyFilterObj = {
        Name: "",
        UpdateUserName: "",
        InsertUserName: "",
        SurveyCompletionStatusId: [],
        SurveyConstraintId: [],
        TargetGroupId: [],
        CategoryId: [],
        Status: [],
        UpdateStartDate: "",
        UpdateEndDate: "",
        InsertEndDate: "",
        InsertStartDate: "",
        OrderBy: "",
        PageNumber: "",
        PageSize: "",
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isSortVisible, setIsSortVisible] = useState(false);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [filterParams, setFilterParams] = useState(emptyFilterObj)

    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    useEffect(() => {
        dispatch(getForms(filterParams))
        dispatch(getFormCategories())
        dispatch(getTargetGroup())
        dispatch(getSurveyConstraint())
    }, [dispatch])

    const forms = useSelector(state => state?.forms);



    const onSelectChange = (newSelectedRowKeys, row) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleDeleteForm = async (question) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Kaydı silmek istediğinizden emin misiniz?',
            okText: <Text t='delete' />,
            cancelText: 'Vazgeç',
            onOk: async () => {
                const ids = selectedRowKeys.length > 0 ? selectedRowKeys : [question.id]
                const action = await dispatch(deleteForm({ ids }));
                if (deleteForm.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt Başarı İle Silindi"
                    });
                } else {
                    errorDialog({
                        title: <Text t='error' />,
                        // message: action?.payload
                        message: "Kayıt Silinirken bir hata ile karşılaştı."
                    });
                }
            }
        });
    }

    const handleActiveForm = (formitem) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Seçilen formu aktifleştirmek istediğinizden emin misiniz?',
            okText: <Text t='Evet' />,
            cancelText: 'Hayır',
            onOk: async () => {
             const ids = selectedRowKeys.length > 0 ? {"ids": selectedRowKeys} :  {"ids": [formitem.id]}
               dispatch(activeForm(ids))
                if (activeForm.fulfilled) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt başarı ile aktif edildi."
                    });
                }
            }
        });
    }

    const handlePassiveForm = (formitem) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Seçilen formu pasifleştirmek istediğinizden emin misiniz?',
            okText: <Text t='Evet' />,
            cancelText: 'Hayır',
            onOk: async () => {
                const ids = selectedRowKeys.length > 0 ? {"ids": selectedRowKeys} :  {"ids": [formitem.id]}
                dispatch(passiveForm(ids))
                if (passiveForm.fulfilled) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        //message: action?.payload
                        message: "Kayıt başarı ile pasif edildi."
                    });
                }
            }
        });
    }

    const action = (row, actionName) => {
         if (actionName === "Sil") {
            handleDeleteForm(row)
        } else if (actionName === "Aktif Et/Yayınla") {
            handleActiveForm(row)
        }  else if (actionName === "Pasif Et/Sonlandır") {
            handlePassiveForm(row)
        } 
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
                        <CustomButton className="add-btn" onClick={() => setIsAddFormVisible(true)} >
                            YENİ ANKET OLUŞTUR
                        </CustomButton>
                    </div>
                    <div className='drafts-count-title'>
                        <CustomImage src={cardsRegistered} />
                        Kayıtlı Form Sayısı: <span>{forms.formList.pagedProperty?.totalCount}</span>
                    </div>
                </div>
                <CustomTable
                    dataSource={forms.formList.items}
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
                                    <CustomButton type='secondary' onClick={handleDeleteForm}>
                                        <span className='sort'>
                                            <Text t='Seçilenleri Sil' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='remove-btn'>
                                    <CustomButton type='secondary' onClick={handlePassiveForm}>
                                        <span className='filter-text'>
                                            <Text t='Seçilenleri Sonlandır/Yayından Kaldır' />
                                        </span>
                                    </CustomButton>
                                </div>
                                <div className='active-btn'>
                                    <CustomButton type='secondary' onClick={handleActiveForm}>
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
                    setFilterParams={setFilterParams}
                    filterParams={filterParams}
                    emptyFilterObj={emptyFilterObj}
                    forms = {forms}
                />
                <SortFormModal
                    modalVisible={isSortVisible}
                    handleModalVisible={setIsSortVisible}
                />
                <AddFormModal
                    modalVisible={isAddFormVisible}
                    handleModalVisible={setIsAddFormVisible}
                />

            </CustomCollapseCard>
        </>
    );
};

export default FormsList;