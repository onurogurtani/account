import { useLocation } from 'react-router-dom';
import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { CustomFormItem, CustomSelect, Option } from '../../../../components';
import { participantGroupTypes } from '../../../../constants/settings/participantGroups';
// import { turkishToLower } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getParticipantGroupsList, resetParticipantGroupsList } from '../../../../store/slice/eventsSlice';
// import { removeFromArray } from '../../../../utils/utils';

const CustomParticipantSelect = ({ form, className, required }) => {
    const [groupVal, setGroupVal] = useState([]);
    const [participantIdsArr, setParticipantIdsArr] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const loadData = async () => {
        dispatch(
            getParticipantGroupsList({
                params: {
                    'ParticipantGroupDetailSearch.PageSize': 100000000,
                },
            }),
        );
    };

    useEffect(() => {
        loadData();

        return () => {
            dispatch(resetParticipantGroupsList());
        };
    }, []);

    const { participantGroupsList } = useSelector((state) => state?.events);

    const [groups, setGroups] = useState([]);

    const onParticipantGroupTypeSelect = async (value) => {};
    const onParticipantGroupTypeDeSelect = async (value) => {};

    const handleSelectChange = (value) => {
        form.resetFields(['participantGroups']);
        setParticipantIdsArr([...value]);
        if (value.length === 0) {
            dispatch(resetParticipantGroupsList());
        } else {
            filterByParticipantTypeIds(value);
        }
    };

    const filterByParticipantTypeIds = async (value) => {
        console.log('value', value);
        let newArr = participantGroupsList.filter((item) => {
            return value.some((v) => v == item.participantType);
        });
        console.log('🚀 ~ file: CustomParticipantSelect.js:55 ~ newArr ~ newArr:', newArr);
        setGroups([...newArr]);
    };

    return (
        <>
            <CustomFormItem
                rules={[{ required: required, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
                label="Katılımcı Türü"
                name="participantTypeOfEvents"
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
                        console.log('val', value);
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

export default CustomParticipantSelect;
