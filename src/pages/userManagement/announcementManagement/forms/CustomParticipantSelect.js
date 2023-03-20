import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { participantGroupTypes } from '../../../../constants/settings/participantGroups';
import { resetParticipantGroupsList } from '../../../../store/slice/eventsSlice';

const CustomParticipantSelect = ({ form, className, required, initialValues }) => {
    const [groupVal, setGroupVal] = useState([]);
    const [participantIdsArr, setParticipantIdsArr] = useState([]);
    const dispatch = useDispatch();
    const { participantGroupsList } = useSelector((state) => state?.events);

    useEffect(() => {
        let typeIds = initialValues?.participantType?.name?.split(',');
        if (typeIds?.length > 0) {
            setParticipantIdsArr([...typeIds]);
            filterByParticipantTypeIds([...typeIds]);
        }
    }, [initialValues]);

    const [groups, setGroups] = useState([]);

    const onParticipantGroupTypeSelect = async (value) => {};
    const onParticipantGroupTypeDeSelect = async (value) => {};

    const handleSelectChange = (value) => {
        console.log('"change"', 'change');
        form.resetFields(['participantGroupIds']);
        setParticipantIdsArr([...value]);
        if (value.length === 0) {
            dispatch(resetParticipantGroupsList());
        } else {
            filterByParticipantTypeIds(value);
        }
    };

    const filterByParticipantTypeIds = async (value) => {
        let typesIdsOfValues = participantGroupTypes.filter((item) => {
            return value.some((v) => v === item?.value);
        });

        let newArr = participantGroupsList.filter((item) => {
            return typesIdsOfValues.some((v) => v.id === item.participantType);
        });
        setGroups([...newArr]);
    };

    return (
        <>
            <CustomFormItem
                rules={[{ required: required, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Katılımcı Türü"
                name="participantTypeIds"
                className={className}
                style={{ width: '100%' }}
            >
                <CustomSelect
                    className="form-filter-item"
                    optionFilterProp="children"
                    showSearch
                    allowClear
                    showArrow
                    mode="multiple"
                    placeholder="Seçiniz"
                    onChange={handleSelectChange}
                    onSelect={onParticipantGroupTypeSelect}
                    onDeselect={onParticipantGroupTypeDeSelect}
                    style={{ width: '100%' }}
                >
                    {participantGroupTypes?.map((item) => {
                        return (
                            <Option key={item?.id} value={item?.value}>
                                {item?.value}
                            </Option>
                        );
                    })}
                </CustomSelect>
            </CustomFormItem>

            <CustomFormItem
                rules={[{ required: required, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Katılımcı Grubu"
                name="participantGroupIds"
                className={className}
                style={{ width: '100%' }}
            >
                <CustomSelect
                    className="form-filter-item"
                    optionFilterProp="children"
                    showSearch
                    allowClear
                    mode="multiple"
                    showArrow
                    value={groupVal}
                    disabled={participantIdsArr?.length === 0}
                    placeholder="Seçiniz"
                    style={{ width: '100%' }}
                    onChange={(value) => {
                        setGroupVal(value);
                    }}
                >
                    {groups?.map((item) => {
                        return (
                            <Option key={item?.id} value={item?.name}>
                                {item?.name}
                            </Option>
                        );
                    })}
                </CustomSelect>
            </CustomFormItem>
        </>
    );
};

export default CustomParticipantSelect;
