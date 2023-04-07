import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../components';
import { participantGroupTypes } from '../constants/settings/participantGroups';
import { resetParticipantGroupsList } from '../store/slice/eventsSlice';
import { getParticipantGroupsList } from '../store/slice/eventsSlice';

const CustomParticipantSelectFormItems = ({ form, className, required, initialValues }) => {
    const dispatch = useDispatch();
    const [groupVal, setGroupVal] = useState([]);
    const [participantIdsArr, setParticipantIdsArr] = useState([]);
    const { participantGroupsList } = useSelector((state) => state?.events);
    const loadParticipantGroups = async () => {
        console.log('"part içinde"', 'part içinde');
        participantGroupsList?.length === 0 &&
            dispatch(
                getParticipantGroupsList({
                    params: {
                        'ParticipantGroupDetailSearch.PageSize': 100000000,
                    },
                }),
            );
    };

    loadParticipantGroups();

    const [groups, setGroups] = useState([...participantGroupsList]);

    useEffect(() => {
        let typeIds = initialValues?.participantType?.id?.split(',')?.map((item) => Number(item));
        if (typeIds?.length > 0) {
            setParticipantIdsArr([...typeIds]);
            filterByParticipantTypeIds([...typeIds]);
        }
    }, [initialValues]);

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
                    {Object.keys(participantGroupTypes)?.map((item) => {
                        return (
                            <Option key={item} value={item}>
                                {participantGroupTypes[item]?.label}
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
