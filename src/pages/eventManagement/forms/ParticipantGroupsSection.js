import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import { getParticipantGroupsList } from '../../../store/slice/eventsSlice';
import { turkishToLower } from '../../../utils/utils';

const ParticipantGroupsSection = () => {
  const dispatch = useDispatch();
  const [participantGroupsList, setParticipantGroupsList] = useState([]);

  useEffect(() => {
    loadparticipantGroups();
  }, []);

  const loadparticipantGroups = useCallback(async () => {
    const action = await dispatch(getParticipantGroupsList());
    if (getParticipantGroupsList?.fulfilled?.match(action)) {
      setParticipantGroupsList(action?.payload?.data?.items);
    } else {
      setParticipantGroupsList([]);
      console.log(action?.payload?.message);
    }
  }, [dispatch]);

  return (
    <CustomFormItem
      rules={[
        {
          required: true,
          message: 'Lütfen Zorunlu Alanları Doldurunuz.',
        },
      ]}
      label="Katılımcı Grubu"
      name="participantGroups"
    >
      <CustomSelect
        filterOption={(input, option) =>
          turkishToLower(option.children).includes(turkishToLower(input))
        }
        showArrow
        mode="multiple"
        placeholder="Lütfen Katılımcı Grubu Seçiniz"
      >
        {participantGroupsList
          //   ?.filter((item) => item.isActive)
          ?.map((item) => {
            return (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            );
          })}
      </CustomSelect>
    </CustomFormItem>
  );
};

export default ParticipantGroupsSection;
