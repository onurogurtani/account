import { Form } from 'antd';
import React, { useCallback, useEffect } from 'react';
import {
    confirmDialog,
    CustomButton,
    CustomCollapseCard,
    CustomForm,
    CustomPageHeader,
    errorDialog,
    Text,
} from '../../../components';
import EventForm from '../forms/EventForm';
import '../../../styles/eventsManagement/addEvent.scss'; // farklı bi tasarım istenirse editEvent.scss oluşturulur
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editEvent, getByEventId, getParticipantGroupsList } from '../../../store/slice/eventsSlice';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import ModuleShowFooter from '../../../components/ModuleShowFooter';

const EditEvent = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();
    const { id } = useParams();

    const { currentEvent } = useSelector((state) => state?.events);
    const isDisableAllButDate = location?.state?.isDisableAllButDate;

    useEffect(() => {
        // if (currentEvent?.id !== Number(id)) {
        loadEvent(id);
        // }
    }, []);

    const loadEvent = useCallback(
        async (id) => {
            const action = await dispatch(getByEventId(id));
            if (!getByEventId.fulfilled.match(action)) {
                if (action?.payload?.message) {
                    errorDialog({
                        title: <Text t="error" />,
                        message: action?.payload?.message,
                    });
                    history.push('/event-management/list');
                }
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (Object.keys(currentEvent).length) {
            currentEvent?.participantTypeOfEvents?.map((item) =>
                dispatch(
                    getParticipantGroupsList({
                        params: {
                            'ParticipantGroupDetailSearch.ParticipantType': item.participantType,
                            'ParticipantGroupDetailSearch.PageSize': 100000000,
                        },
                    }),
                ),
            );
            setFormFieldsValue();
        }
    }, [currentEvent]);

    console.log(
        'first',
        currentEvent?.participantGroups?.map((item) => item.participantGroupId),
    );

    const setFormFieldsValue = async () => {
        form.setFieldsValue({
            name: currentEvent?.name,
            description: currentEvent?.description,
            isActive: currentEvent?.isActive,
            isPublised: currentEvent?.isPublised,
            isDraft: currentEvent?.isDraft,
            formId: currentEvent?.formId,
            categoryOfFormId: currentEvent?.form?.categoryOfFormId,
            eventTypeEnum: currentEvent?.eventTypeEnum,
            locationType: currentEvent?.locationType,
            physicalAddress: currentEvent?.physicalAddress,
            participantTypeOfEvents: currentEvent?.participantTypeOfEvents?.map((item) => item.participantType),
            participantGroups: currentEvent?.participantGroups?.map((item) => item.participantGroupId),
            eventTypeOfEvents: currentEvent?.eventTypeOfEvents?.map((item) => item.eventTypeId),
            startDate: dayjs(currentEvent?.startDate).startOf('minute'),
            endDate: dayjs(currentEvent?.endDate).startOf('minute'),
            keyWords: currentEvent?.keyWords?.split(','),
            ...(currentEvent?.declarations.length > 0 && {
                declarationTypes: currentEvent?.declarations?.[0]?.declarationTypes,
                declarations: currentEvent?.declarations?.map((item) => ({
                    day: item.day,
                })),
            }),
        });

        if (isDisableAllButDate) {
            //isDisableAllButDate sadece tarih editlenebilceği zaman
            form.validateFields(['startDate', 'endDate']);
        }
    };

    const handleBackButton = () => {
        history.push(`/event-management/show/${id}`);
    };

    const onCancel = () => {
        confirmDialog({
            title: <Text t="attention" />,
            message: 'İptal etmek istediğinizden emin misiniz?',
            okText: 'Evet',
            cancelText: 'Hayır',
            onOk: async () => {
                handleBackButton();
            },
        });
    };

    const onFinish = async (isPublised, isDraft) => {
        const values = await form.validateFields();
        values.id = id;
        values.isPublised = isPublised;
        if (isPublised) {
            values.isActive = true;
        }
        values.isDraft = isDraft;
        values.participantTypeOfEvents = values.participantTypeOfEvents.map((item) => ({
            participantType: item,
        }));
        values.participantGroups = values.participantGroups.map((item) => ({
            participantGroupId: item,
        }));
        values.startDate = values?.startDate.utc().startOf('minute');
        values.endDate = values?.endDate.utc().startOf('minute');
        values.keyWords = values.keyWords.join();
        if (!values.formId) {
            delete values?.categoryOfFormId;
            delete values?.formId;
        }
        values.eventTypeOfEvents = values.eventTypeOfEvents.map((item) => ({
            eventTypeId: item,
        }));
        if (values.declarations) {
            values.declarations = values?.declarations.map((item) => ({
                declarationTypes: values.declarationTypes,
                declarationDateType: 1,
                declarationPriorityType: 1,
                day: item.day,
            }));
        }
        const action = await dispatch(editEvent({ event: values }));
        if (editEvent.fulfilled.match(action)) {
            confirmDialog({
                title: <Text t="success" />,
                message: 'Etkinlik Başarıyla Güncellendi. Duyuru Listesinde Gösterilsin İster Misiniz?',
                onOk: async () => {
                    history.push('/user-management/announcement-management/add');
                },
                onCancel: async () => {
                    history.push('/event-management/list');
                },
                okText: 'Evet',
                cancelText: 'Hayır',
            });
        } else {
            errorDialog({ title: <Text t="error" />, message: action?.payload.message });
        }
    };

    return (
        <>
            <CustomPageHeader title="Etkinlik Düzenleme" routes={['Etkinlik Yönetimi']} showBreadCrumb>
                <CustomButton
                    type="primary"
                    htmlType="submit"
                    className="submit-btn"
                    onClick={handleBackButton}
                    style={{ margin: '0px 10px 20px' }}
                >
                    Geri
                </CustomButton>
                <CustomCollapseCard cardTitle="Etkinlik Düzenle">
                    <div className="add-event-container">
                        <div className="add-event-form">
                            <CustomForm
                                labelCol={{ flex: '250px' }}
                                autoComplete="off"
                                layout="horizontal"
                                form={form}
                                name="form"
                                initialValues={{
                                    isActive: true,
                                }}
                            >
                                <EventForm form={form} />
                            </CustomForm>
                        </div>
                        <div className="add-event-footer">
                            <CustomButton onClick={onCancel} type="primary" className="cancel-btn">
                                İptal
                            </CustomButton>
                            {!currentEvent?.isPublised && (
                                <CustomButton
                                    onClick={() => onFinish(false, true)}
                                    type="primary"
                                    className="save-draft-btn"
                                >
                                    Taslak Olarak Kaydet
                                </CustomButton>
                            )}

                            <CustomButton onClick={() => onFinish(true, false)} type="primary" className="save-btn">
                                Güncelle ve Yayınla
                            </CustomButton>
                        </div>
                    </div>
                </CustomCollapseCard>
                <ModuleShowFooter
                    insertTime={currentEvent?.insertTime}
                    insertUserFullName={currentEvent?.insertUserFullName}
                    updateTime={currentEvent?.updateTime}
                    updateUserFullName={currentEvent?.updateUserFullName}
                />
            </CustomPageHeader>
        </>
    );
};

export default EditEvent;
