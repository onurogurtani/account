import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modalSuccessIcon from '../../../../assets/icons/icon-modal-success.svg';
import {
    confirmDialog,
    CustomButton,
    CustomFormItem,
    CustomImage,
    CustomModal,
    errorDialog,
    Text,
} from '../../../../components';
import { editAnnouncement, getAvatarUpload } from '../../../../store/slice/announcementSlice';

import { getParticipantGroupsList } from '../../../../store/slice/eventsSlice';

import '../../../../styles/announcementManagement/saveAndFinish.scss';
const EditAnnouncementFooter = ({ form, history, currentId, fileImage, initialValues }) => {
    const dispatch = useDispatch();
    const [updatedAnnouncement, setUpdatedAnnouncement] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const { announcementTypes, updateAnnouncementObject } = useSelector((state) => state?.announcement);
    const { participantGroupsList } = useSelector((state) => state?.events);

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: <Text t="Evet" />,
            cancelText: 'Hayır',
            onOk: async () => {
                history.push('/user-management/announcement-management');
            },
        });
    };
    const onFinish = async (status) => {
        const values = await form.validateFields();
        const startOfAnnouncement = values?.startDate
            ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD-HH-mm')
            : undefined;

        const endOfAnnouncement = values?.endDate
            ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD-HH-mm')
            : undefined;

        if (startOfAnnouncement >= endOfAnnouncement) {
            errorDialog({
                title: <Text t="error" />,
                message: 'Başlangıç Tarihi Bitiş Tarihinden Önce Olmalıdır',
            });
            return;
        }

        try {
            const startDate = values?.startDate ? dayjs(values?.startDate)?.utc().format('YYYY-MM-DD') : undefined;
            const startHour = values?.startDate ? dayjs(values?.startDate)?.utc().format('HH:mm:ss') : undefined;
            const endDate = values?.endDate ? dayjs(values?.endDate)?.utc().format('YYYY-MM-DD') : undefined;
            const endHour = values?.endDate ? dayjs(values?.endDate)?.utc().format('HH:mm:ss') : undefined;
            const typeId = values.announcementType;

            const foundType = [];
            for (let i = 0; i < announcementTypes.length; i++) {
                if (announcementTypes[i].id == typeId) {
                    foundType.push(announcementTypes[i]);
                }
            }
            let fileId = updateAnnouncementObject?.fileId;
            if (Array.isArray(values.fileId)) {
                let res = await dispatch(getAvatarUpload(fileImage));
                fileId = await res?.payload?.data?.id;
            }
            let selectedGroupsArray = participantGroupsList.filter((p) => values.participantGroupIds.includes(p?.name));
            let idsArr = [];
            selectedGroupsArray?.map((item) => idsArr.push(item?.id));
            idsArr.push();

            const data = {
                participantGroupIds: idsArr,
                id: currentId,
                announcementType: foundType[0],
                headText: values.headText.trim(),
                content: values.content,
                homePageContent: values.homePageContent,
                startDate: startDate + 'T' + startHour + '.000Z',
                endDate: endDate + 'T' + endHour + '.000Z',
                fileId: fileId,
                buttonName: values.buttonName,
                buttonUrl: values.buttonUrl,
                isArchived: false,
                isPublished: true,
                publishStatus: status,
                announcementPublicationPlaces: values.announcementPublicationPlaces,
                isPopupAvailable: values?.announcementPublicationPlaces.includes(4),
                isReadCheckbox: values?.isReadCheckbox,
            };

            const action = await dispatch(editAnnouncement(data));

            if (Array.isArray(values?.fileId)) {
                data.file = values?.fileId[0];
            }
            if (editAnnouncement.fulfilled.match(action)) {
                setIsVisible(true);
                setUpdatedAnnouncement({ ...initialValues, ...data });
            } else {
                errorDialog({
                    title: <Text t="error" />,
                    message: action?.payload?.message,
                });
            }
        } catch (error) {
            errorDialog({
                title: <Text t="error" />,
                message: error,
            });
        }
    };
    return (
        <>
            <CustomModal
                maskClosable={false}
                footer={false}
                title={
                    <>
                        <CustomImage src={modalSuccessIcon} /> <span>Kayıt Güncellendi</span>
                    </>
                }
                visible={isVisible}
                closable={false}
                className={'success-finish-modal'}
            >
                <p>Şimdi Ne yapmak İstersin?</p>
                <CustomButton
                    type="primary"
                    onClick={() => {
                        history.push({
                            pathname: '/user-management/announcement-management/show',
                            state: { data: updatedAnnouncement },
                        });
                    }}
                    className="submit-btn mb-2 mt-2"
                >
                    Güncellenen Kaydı Görüntüle
                </CustomButton>
                <CustomButton
                    type="primary"
                    onClick={() => history.push('/user-management/announcement-management')}
                    className="submit-btn"
                >
                    Tüm Kayıtları Görüntüle
                </CustomButton>
            </CustomModal>

            <div className="edit-footer">
                <CustomFormItem className="footer-form-item edit-announcement-footer">
                    <CustomButton className="cancel-btn" onClick={onCancel}>
                        İptal
                    </CustomButton>
                    {initialValues.publishStatus != 1 && (
                        <CustomButton className="draft-btn" onClick={() => onFinish(3)}>
                            Taslak Olarak Kaydet
                        </CustomButton>
                    )}

                    <CustomButton className="save-and-finish-btn" onClick={() => onFinish(1)}>
                        Kaydet ve yayınla
                    </CustomButton>
                </CustomFormItem>
            </div>
        </>
    );
};

export default EditAnnouncementFooter;
