import { Tabs } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { CustomCollapseCard, Text, confirmDialog } from '../../../../components';
import { getAllClassStages } from '../../../../store/slice/classStageSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../../../styles/surveyManagement/showForm.module.scss';
import { getFormCategories, getFormPackages, getAllQuestionsOfForm } from '../../../../store/slice/formsSlice';
import PreviewList from '../addForm/questionComponents/PreviewList';

const { TabPane } = Tabs;
const formPublicationPlacesReverseEnum = {
    1: 'Anasayfa',
    2: 'Anketler Sayfası',
    3: 'Pop-up',
    4: 'Bildirimler',
};

const ShowFormTabs = ({ showData }) => {
    console.log('ShowFormTabs te showFormObj', showData);
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(true);
    const { formCategories, formPackages, questionsOfForm } = useSelector((state) => state?.forms);
    useEffect(() => {
        if (!formPackages) {
            dispatch(getFormPackages());
        }
    }, [formPackages]);

    const getQuestionData = async () => {
        await dispatch(getAllQuestionsOfForm({ formId: showData.id }));
    };

    useEffect(() => {
        if (showData) {
            getQuestionData();
        }
    }, [showData]);

    useEffect(() => {
        const getData = async () => {
            await dispatch(getAllClassStages());
            await dispatch(getFormCategories({ pageNumber: 0 }));
            await dispatch(getFormPackages());
        };
        getData();
    }, []);
    const { allClassList } = useSelector((state) => state?.classStages);
    const handleClose = async () => {
        confirmDialog({
            title: <Text t="Bilgilendirme Mesajı" />,
            message:
                'Kullanıcı anketi bitirdiğinde sorulara verdiği cevaplar kontrol edilecek, eğer anket bitirme koşulunu sağlamışsa cevaplar değerlendirilmek üzere kaydedilecektir.',
            okText: <Text t="Tamam" />,
            cancelText: <Text t="" />,
        });
    };

    return (
        <Tabs defaultActiveKey={'1'}>
            <TabPane tab="Genel Bilgiler" key="1">
                <CustomCollapseCard cardTitle={<Text t="Genel Bilgiler" />}>
                    <ul className={classes['form-show']}>
                        <li>
                            <Text t="Anket Adı" /> : <span>{showData?.name}</span>
                        </li>
                        <li>
                            <Text t="Açıklama" /> :<span>{showData?.description}</span>
                        </li>
                        <li>
                            <Text t="Kategori" /> : <span>{showData?.categoryOfForm?.name}</span>
                        </li>
                        {showData?.categoryOfFormId == 5 && (
                            <>
                                <li>
                                    <Text t="Sınıf Seviyesi" />:{' '}
                                    <span>{showData?.formClassrooms[0]?.classroom?.name}</span>
                                </li>
                                <li>
                                    <Text t="Paketler" />: <span>{showData?.packages[0].package?.name}</span>
                                </li>
                            </>
                        )}
                        <li>
                            <Text t="Katılımcı Tipi" /> :
                            <div className={classes.placesContainer}>
                                {showData?.participantType?.name?.split(',').map((text, index) => (
                                    <span key={index} className="roles">
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </li>
                        <li>
                            <Text t="Katılımcı Grubu" /> :
                            <div className={classes.placesContainer}>
                                {showData?.participantGroup?.name?.split(',').map((text, index) => (
                                    <span key={index} className="roles">
                                        {text}
                                    </span>
                                ))}
                            </div>
                        </li>
                        <li>
                            <Text t="Başlangıç Tarihi ve Saati" /> :{' '}
                            <span>{dayjs(showData?.startDate)?.format('YYYY-MM-DD HH:mm')}</span>
                        </li>
                        <li>
                            <Text t="Bitiş Tarihi ve Saati" /> :{' '}
                            <span>{dayjs(showData?.endDate)?.format('YYYY-MM-DD HH:mm')}</span>
                        </li>
                        <li>
                            <Text t="Yayınlanma Durumu" /> :{' '}
                            <span>
                                {showData?.publishStatus == 1 && (
                                    <span className={classes['status-text-active']}>Yayında</span>
                                )}
                                {showData?.publishStatus == 2 && (
                                    <span className={classes['status-text-passive']}>Yayında Değil</span>
                                )}
                                {showData?.publishStatus == 3 && (
                                    <span className={classes['status-text-draft']}>Taslak</span>
                                )}
                            </span>
                        </li>
                        <li>
                            <Text t="Anket Tamamlama Koşulu" /> :{' '}
                            <span>
                                {showData?.onlyComletedWhenFinish
                                    ? 'Kullanıcı tüm sorular cevapladığında anketi bitirebilir'
                                    : 'Kullanıcı her an anketi bitirebilir'}
                            </span>
                        </li>
                        <li>
                            <Text t="Yayınlanma Yeri" /> :{' '}
                            <div className={classes.placesContainer}>
                                {showData?.formPublicationPlaces?.map((placeId, index) => (
                                    <span key={index}>{formPublicationPlacesReverseEnum[placeId]}</span>
                                ))}
                            </div>
                        </li>
                    </ul>
                </CustomCollapseCard>
                <ul className={classes['form-show-footer']}>
                    <li>
                        <Text t="Oluşturma Tarihi" /> :{' '}
                        <span>{dayjs(showData?.insertTime)?.format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                    <li>
                        <Text t="Oluşturan" /> : <span>{showData?.insertUserFullName}</span>
                    </li>
                    {/* <li>
            <Text t="Güncelleme Tarihi" /> : <span>{showData?.updateUserFullName}</span>
          </li> */}
                    <li>
                        <Text t="Güncelleyen" /> : <span>{showData?.updateUserFullName}</span>
                    </li>
                </ul>
            </TabPane>
            <TabPane tab="Sorular" key="2">
                <CustomCollapseCard cardTitle={<Text t="Sorular" />}>
                    <PreviewList
                        currentForm={showData}
                        questionsOfForm={questionsOfForm}
                        handleClose={handleClose}
                        preview={preview}
                        setPreview={setPreview}
                    />
                </CustomCollapseCard>
            </TabPane>
        </Tabs>
    );
};

export default ShowFormTabs;
