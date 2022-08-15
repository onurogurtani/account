import React from 'react'
import {
    confirmDialog,
    CustomButton,
    CustomCollapseCard,
    CustomImage,
    CustomTable,
    errorDialog,
    successDialog,
    Text,
} from '../../../components';
import cardsRegistered from '../../../assets/icons/icon-cards-registered.svg';
import '../../../styles/draftOrder/draftList.scss';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages, deleteImage } from '../../../store/slice/avatarSlice';
import AvatarFormModal from './AvatarFormModal';

const AvatarList = () => {

    const dispatch = useDispatch();
    const { images } = useSelector((state) => state?.avatarFiles);

    const [avatarFormModalVisible, setAvatarFormModalVisible] = useState(false);

    useEffect(() => {
        loadImages()
    }, []);


    const loadImages = useCallback(
        async () => {
            dispatch(getAllImages());
        }
        , [dispatch]
    );


    const addFormModal = () => {
        setAvatarFormModalVisible(true);
    };

    const handleDeleteImage = async (record) => {
        confirmDialog({
            title: <Text t='attention' />,
            message: 'Kaydı silmek istediğinizden emin misiniz?',
            okText: <Text t='delete' />,
            cancelText: 'Vazgeç',
            onOk: async () => {
                let data = {
                    id: record.id,
                };
                const action = await dispatch(deleteImage(data));
                if (deleteImage.fulfilled.match(action)) {
                    successDialog({
                        title: <Text t='successfullySent' />,
                        message: action?.payload
                    });
                } else {
                    errorDialog({
                        title: <Text t='error' />,
                        message: action?.payload
                    });
                }
            }
        });
    }


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'image',
            render: (_, record) => {
                return <img src={`data:${record?.contentType};base64,${record?.image}`} alt="avatar" width="100" />
            }
        },
        {
            title: 'Avatar Adı',
            dataIndex: 'fileName',
            key: 'fileName',
        },
        {
            title: 'İşlemler',
            dataIndex: 'draftDeleteAction',
            key: 'draftDeleteAction',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return (
                    <div className='action-btns'>
                        <CustomButton
                            className='delete-btn'
                            onClick={() => handleDeleteImage(record)}
                        >
                            Sil
                        </CustomButton>
                    </div>
                );
            }
        }
    ]

    return (
        <CustomCollapseCard
            className='draft-list-card'
            cardTitle={<Text t='Avatar Listesi' />}
        >
            <div className='number-registered-drafts'>
                <CustomButton className="add-btn" onClick={addFormModal}>
                    YENİ AVATAR EKLE
                </CustomButton>
                <div className='drafts-count-title'>
                    <CustomImage src={cardsRegistered} />
                    Kayıtlı Avatar Sayısı: <span>{images.length}</span>
                </div>
            </div>
            <CustomTable
                pagination={true}
                dataSource={images}
                columns={columns}
                rowKey={(record) => `draft-list-new-order-${record?.id || record?.name}`}
                scroll={{ x: false }}
            />
            <AvatarFormModal
                modalVisible={avatarFormModalVisible}
                handleModalVisible={setAvatarFormModalVisible}
            />
        </CustomCollapseCard>
    )
}

export default AvatarList