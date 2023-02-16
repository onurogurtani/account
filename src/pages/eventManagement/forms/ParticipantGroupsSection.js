import { useLocation } from 'react-router-dom';
import { CustomFormItem, CustomSelect, Option } from '../../../components';
import { participantGroupTypes } from '../../../constants/settings/participantGroups';

import { turkishToLower } from '../../../utils/utils';
import useParticipantGroups from '../hooks/useParticipantGroups';

const ParticipantGroupsSection = ({ form }) => {
  const location = useLocation();
  const { onParticipantGroupTypeSelect, onParticipantGroupTypeDeSelect, participantGroupsList } = useParticipantGroups(
    form,
    'participantGroups',
  );

  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  return (
    <>
      <CustomFormItem
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Katılımcı Türü"
        name="participantTypeOfEvents"
      >
        <CustomSelect
          showArrow
          mode="multiple"
          disabled={isDisableAllButDate}
          placeholder="Seçiniz"
          onSelect={onParticipantGroupTypeSelect}
          onDeselect={onParticipantGroupTypeDeSelect}
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
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
        label="Katılımcı Grubu"
        name="participantGroups"
      >
        <CustomSelect
          filterOption={(input, option) => turkishToLower(option.children).includes(turkishToLower(input))}
          showArrow
          mode="multiple"
          disabled={isDisableAllButDate || participantGroupsList.length === 0}
          placeholder="Lütfen Katılımcı Grubu Seçiniz"
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
    </>
  );
};

export default ParticipantGroupsSection;
