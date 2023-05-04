import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../components';
import { participantGroupTypes } from '../constants/settings/participantGroups';
import participantGroupsServices from '../services/participantGroups.services';
import { getByFilterPagedParamsHelper } from '../utils/utils';

const CustomParticipantSelectFormItems = ({ form, className, required, initialValues }) => {
    const dispatch = useDispatch();
    const [groupVal, setGroupVal] = useState([]);
    const [participantIdsArr, setParticipantIdsArr] = useState([]);
    const [groups, setGroups] = useState([]);

    const loadParticipantGroups = async (value) => {
        let data = { pageSize: 1000 };
        if (value) {
            data.UserTypes = value;
        }
        const params = getByFilterPagedParamsHelper(data, 'ParticipantGroupDetailSearch.');
        const response = await participantGroupsServices.getParticipantGroupsPagedList(params);
        const partGroups = response?.data?.items;
        setGroups(partGroups);
    };

    useEffect(() => {
        let typeIds = initialValues?.participantType?.id?.split(',');
        if (typeIds?.length > 0) {
            setParticipantIdsArr([...typeIds]);
            loadParticipantGroups(typeIds);
        }
    }, [initialValues]);

    const handleSelectChange = async (value) => {
        form.resetFields(['participantGroupIds']);
        setParticipantIdsArr([...value]);
        await loadParticipantGroups(value);
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
                        console.log(value);
                    }}
                >
                    {groups?.map(({ name, id }) => {
                        return (
                            <Option key={id} value={id}>
                                {name}
                            </Option>
                        );
                    })}
                </CustomSelect>
            </CustomFormItem>
        </>
    );
};

export default CustomParticipantSelectFormItems;
