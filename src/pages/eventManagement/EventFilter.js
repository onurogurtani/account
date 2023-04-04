import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'antd';
import {
    AutoCompleteOption,
    CustomAutoComplete,
    CustomDatePicker,
    CustomFormItem,
    CustomSelect,
    Option,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { turkishToLower } from '../../utils/utils';
import { getAllEventsKeyword, getByFilterPagedEvents, getEventNames, setIsFilter } from '../../store/slice/eventsSlice';
import { dateTimeFormat } from '../../utils/keys';
import { getEventTypes } from '../../store/slice/eventTypeSlice';
import TableFilter from '../../components/TableFilter';
import dayjs from 'dayjs';
import useParticipantGroups from './hooks/useParticipantGroups';
import { participantGroupTypes } from '../../constants/settings/participantGroups';

const EventFilter = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const state = (state) => state?.events;
    const { filterObject, isFilter } = useSelector(state);

    const [eventNameList, setEventNameList] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const { eventTypes } = useSelector((state) => state?.eventType);
    const { onParticipantGroupTypeSelect, onParticipantGroupTypeDeSelect, participantGroupsList } =
        useParticipantGroups(form, 'ParticipantGroupId');

    useEffect(() => {
        loadEventNames();
        loadEventKeywords();
        dispatch(getEventTypes({ PageSize: 999999, IsActive: true }));
    }, []);

    useEffect(() => {
        if (isFilter) {
            form.setFieldsValue(filterObject);
        }
    }, []);

    const loadEventKeywords = async () => {
        try {
            const action = await dispatch(getAllEventsKeyword()).unwrap();
            setKeywords(action?.data);
        } catch (err) {
            setKeywords([]);
        }
    };

    const loadEventNames = useCallback(async () => {
        const action = await dispatch(getEventNames());
        if (getEventNames?.fulfilled?.match(action)) {
            setEventNameList(action?.payload?.data);
        } else {
            setEventNameList([]);
            console.log(action?.payload?.message);
        }
    }, [dispatch]);

    const onFinish = useCallback(
        async (values) => {
            console.log(values);
            try {
                const body = {
                    ...filterObject,
                    ...values,
                    KeyWords: values.KeyWords?.toString(),
                    StartDate: values?.StartDate ? dayjs.utc(values?.StartDate).startOf('minute').format() : undefined,
                    EndDate: values?.EndDate ? dayjs.utc(values?.EndDate).startOf('minute').format() : undefined,
                    Status: values?.Status === 0 ? undefined : values?.Status,
                    PublishedStatus: values?.PublishedStatus === 0 ? undefined : values?.PublishedStatus,
                    PageNumber: 1,
                };
                await dispatch(getByFilterPagedEvents(body));
                await dispatch(setIsFilter(true));
            } catch (e) {
                console.log(e);
            }
        },
        [dispatch, filterObject],
    );

    const reset = async () => {
        form.resetFields();
        await dispatch(
            getByFilterPagedEvents({
                PageSize: filterObject?.PageSize,
                OrderBy: filterObject?.OrderBy,
            }),
        );
        await dispatch(setIsFilter(false));
    };

    const tableFilterProps = { onFinish, reset, state, extra: [form] };

    return (
        <TableFilter {...tableFilterProps}>
            <div className="form-item">
                <CustomFormItem label="Etkinlik Adı" name="Name">
                    <CustomAutoComplete
                        placeholder="Etkinlik Adı"
                        filterOption={(input, option) =>
                            turkishToLower(option.children).includes(turkishToLower(input))
                        }
                    >
                        {eventNameList.map((item) => (
                            <AutoCompleteOption key={item} value={item}>
                                {item}
                            </AutoCompleteOption>
                        ))}
                    </CustomAutoComplete>
                </CustomFormItem>

                <CustomFormItem label="Etkinlik Türü" name="EventTypeId">
                    <CustomSelect
                        filterOption={(input, option) =>
                            turkishToLower(option.children).includes(turkishToLower(input))
                        }
                        showArrow
                        mode="multiple"
                        placeholder="Etkinlik Türü"
                    >
                        {eventTypes?.map((item) => {
                            return (
                                <Option key={item?.no} value={item?.no}>
                                    {item?.name}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Katılımcı Türü" name="???">
                    <CustomSelect
                        showArrow
                        mode="multiple"
                        placeholder="Seçiniz"
                        onSelect={onParticipantGroupTypeSelect}
                        onDeselect={onParticipantGroupTypeDeSelect}
                    >
                        {Object.keys(participantGroupTypes)?.map((item) => {
                            return (
                                <Option key={item} value={participantGroupTypes[item]?.value}>
                                    {participantGroupTypes[item]?.value}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Katılımcı Grubu" name="ParticipantGroupId">
                    <CustomSelect
                        filterOption={(input, option) =>
                            turkishToLower(option.children).includes(turkishToLower(input))
                        }
                        showArrow
                        mode="multiple"
                        placeholder="Katılımcı Grubu"
                        disabled={participantGroupsList.length === 0}
                    >
                        {participantGroupsList?.map((item) => {
                            return (
                                <Option key={item?.id} value={item?.id}>
                                    {item?.name}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Başlangıç Tarihi ve Saati" name="StartDate">
                    <CustomDatePicker showTime format={dateTimeFormat} />
                </CustomFormItem>

                <CustomFormItem label="Bitiş Tarihi ve Saati" name="EndDate">
                    <CustomDatePicker showTime format={dateTimeFormat} />
                </CustomFormItem>

                <CustomFormItem label="Yayınlanma Durumu" name="PublishedStatus">
                    <CustomSelect placeholder="Yayınlanma Durumu">
                        <Option key={0} value={0}>
                            Hepsi
                        </Option>
                        <Option key={1} value={true}>
                            Yayınlanmış
                        </Option>
                        <Option key={2} value={false}>
                            Taslak
                        </Option>
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Durum" name="Status">
                    <CustomSelect placeholder="Durum">
                        <Option key={0} value={0}>
                            Hepsi
                        </Option>
                        <Option key={1} value={true}>
                            Aktif
                        </Option>
                        <Option key={2} value={false}>
                            Pasif
                        </Option>
                    </CustomSelect>
                </CustomFormItem>

                <CustomFormItem label="Anahtar Kelimeler" name="KeyWords">
                    <CustomSelect showArrow mode="multiple" placeholder="Anahtar Kelimeler">
                        {keywords?.map((item) => {
                            return (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            );
                        })}
                    </CustomSelect>
                </CustomFormItem>
            </div>
        </TableFilter>
    );
};

export default EventFilter;
