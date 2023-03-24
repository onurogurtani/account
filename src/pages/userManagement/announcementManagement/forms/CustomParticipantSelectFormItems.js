import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { participantGroupTypes } from '../../../../constants/settings/participantGroups';
import { resetParticipantGroupsList } from '../../../../store/slice/eventsSlice';

const CustomParticipantSelectFormItems = ({ form, className, required, initialValues }) => {
    const [groupVal, setGroupVal] = useState([]);
    const [participantIdsArr, setParticipantIdsArr] = useState([]);
    const dispatch = useDispatch();
    const { participantGroupsList } = useSelector((state) => state?.events);

    useEffect(() => {
        let typeIds = initialValues?.participantType?.id?.split(',')?.map((item) => Number(item));
        if (typeIds?.length > 0) {
            setParticipantIdsArr([...typeIds]);
            filterByParticipantTypeIds([...typeIds]);
        }
    }, [initialValues]);

    const [groups, setGroups] = useState([]);

    const onParticipantGroupTypeSelect = async (value) => {};
    const onParticipantGroupTypeDeSelect = async (value) => {};

    const handleSelectChange = (value) => {
        form.resetFields(['participantGroupIds']);
        setParticipantIdsArr([...value]);
        if (value.length === 0) {
            dispatch(resetParticipantGroupsList());
        } else {
            filterByParticipantTypeIds(value);
        }
    };

    const filterByParticipantTypeIds = async (value) => {
        let newArr = participantGroupsList.filter((item) => {
            return value.some((v) => v === item?.userType);
        });
        const uniqueArr = [];

        newArr.forEach((obj) => {
            const isDuplicate = uniqueArr.some((uniqueObj) => {
                return obj.id === uniqueObj.id;
            });
            if (!isDuplicate) {
                uniqueArr.push(obj);
            }
        });
        setGroups([...uniqueArr]);
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
                            <Option key={item?.id} value={item?.id}>
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
                            <Option key={item?.id} value={item?.id}>
                                {item?.name}
                            </Option>
                        );
                    })}
                </CustomSelect>
            </CustomFormItem>
        </>
    );
};

export default CustomParticipantSelectFormItems;
