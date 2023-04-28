import dayjs from 'dayjs';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    confirmDialog,
    CustomButton,
    CustomCheckbox,
    CustomCollapseCard,
    CustomPageHeader,
    Text,
} from '../../../../components';
import '../../../../styles/settings/contracts.scss';

const ShowContracts = () => {
    const history = useHistory();
    const location = useLocation();
    const showData = location?.state?.data;

    const handleBack = () => {
        history.push('/settings/contracts');
    };
    const handleEdit = () => {
        let newData = { ...showData, handleType: 'edit' };
        history.push({
            pathname: '/settings/contracts/edit',
            state: { data: newData },
        });
    };
    const handleCopy = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'Sözleşmenin kopyasını oluşturmak istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                let newData = { ...showData, handleType: 'copy' };
                history.push({
                    pathname: '/settings/contracts/edit',
                    state: { data: newData },
                });
            },
        });
    };

    showData?.contractTypes?.map((c) => console.log(c?.contractType?.name));

    return (
        <CustomPageHeader title={'Sözleşme Görüntüleme'} showBreadCrumb routes={['Ayarlar', 'Sözleşmeler']}>
            <div className="btn-group">
                <CustomButton type="primary" htmlType="submit" className="submit-btn" onClick={handleBack}>
                    Geri
                </CustomButton>
                <CustomButton type="primary" htmlType="submit" className="edit-btn" onClick={handleEdit}>
                    Düzenle
                </CustomButton>
                <CustomButton type="primary" htmlType="submit" className="shared-btn" onClick={handleCopy}>
                    {'Kopyala'}
                </CustomButton>
            </div>
            <CustomCollapseCard cardTitle="Sözleşme Görüntüleme">
                <ul className="contract-show">
                    <li style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text t="Sözleşme Tipi" /> :{' '}
                        <ul style={{ listStyleType: 'none' }}>
                            {showData?.contractTypes?.map((c) => (
                                <li>{c?.contractType?.name}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <Text t="Sözleşme Türü Adı" /> : <span>{showData?.contractKind.name}</span>
                    </li>
                    <li style={{ height: 'auto' }} className="content-text-container">
                        <Text t="İçerik" /> :
                        <div
                            className="contract-content-text"
                            dangerouslySetInnerHTML={{ __html: showData?.content }}
                        ></div>
                    </li>
                    <li>
                        <Text t="Versiyon Bilgisi" /> : <span>{showData?.version}</span>
                    </li>

                    <li>
                        <Text t="Geçerlilik Başlangıç Tarihi" /> :{' '}
                        <span>{dayjs(showData?.validStartDate)?.format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                    <li>
                        <Text t="Geçerlilik  Bitiş Tarihi" /> :{' '}
                        <span>{dayjs(showData?.validEndDate)?.format('YYYY-MM-DD HH:mm')}</span>
                    </li>
                    <li>
                        <CustomCheckbox disabled={true} checked={showData?.requiredApproval}>
                            Onay Talebi
                        </CustomCheckbox>
                    </li>
                    <li>
                        <CustomCheckbox disabled={true} checked={showData?.clientRequiredApproval}>
                            Son Kullanıcı Onay Talebi
                        </CustomCheckbox>
                    </li>
                    <li>
                        <Text t="Durumu" /> : <span>{showData?.recordStatus == 1 ? 'Aktif' : 'Pasif'}</span>
                    </li>
                </ul>
                <ul className="contract-show-footer">
                    {showData?.insertTime && (
                        <li>
                            <Text t="Oluşturma Tarihi" /> :{' '}
                            <span>{dayjs(showData?.insertTime)?.format('YYYY-MM-DD HH:mm')}</span>
                        </li>
                    )}
                    {showData?.insertUserFullName && (
                        <li>
                            <Text t="Oluşturan" /> : <span>{showData?.insertUserFullName}</span>
                        </li>
                    )}
                    {showData?.updateTime && (
                        <li>
                            <Text t="Güncelleme Tarihi" /> :{' '}
                            <span>{dayjs(showData?.updateTime)?.format('YYYY-MM-DD HH:mm')}</span>
                        </li>
                    )}
                    {showData?.updateUserFullName && (
                        <li>
                            <Text t="Güncelleyen" /> : <span>{showData?.updateUserFullName}</span>
                        </li>
                    )}
                </ul>
            </CustomCollapseCard>
        </CustomPageHeader>
    );
};

export default ShowContracts;
