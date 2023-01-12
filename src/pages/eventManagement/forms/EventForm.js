import { Radio } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CustomFormItem, CustomInput, CustomRadio, DeclarationSection } from '../../../components';
import SurveyListWithSelectedSurveyCategory from '../../../components/SurveyListWithSelectedSurveyCategory';
import { eventTypes } from '../../../constants/events';
import DateSection from './DateSection';
import EventKeywordsSection from './EventKeywordsSection';
import EventLocationSection from './EventLocationSection';
import EventTypeSection from './EventTypeSection';
import ParticipantGroupsSection from './ParticipantGroupsSection';

const EventForm = ({ form }) => {
  const location = useLocation();

  const isDisableAllButDate = location?.state?.isDisableAllButDate;

  return (
    <>
      <CustomFormItem
        label="Etkinlik Adı"
        name="name"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <CustomInput disabled={isDisableAllButDate} placeholder="Etkinlik Adı" />
      </CustomFormItem>

      <CustomFormItem
        label="Açıklama"
        name="description"
        rules={[
          { required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
          { whitespace: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' },
        ]}
      >
        <CustomInput disabled={isDisableAllButDate} placeholder="Açıklama" />
      </CustomFormItem>

      <EventTypeSection />

      <CustomFormItem
        label="Etkinlik Tipi"
        name="eventTypeEnum"
        rules={[{ required: true, message: 'Lütfen Zorunlu Alanları Doldurunuz.' }]}
      >
        <Radio.Group disabled={isDisableAllButDate}>
          {eventTypes.map((item) => (
            <CustomRadio key={item.id} value={item.id}>
              {item.value}
            </CustomRadio>
          ))}
        </Radio.Group>
      </CustomFormItem>
      <SurveyListWithSelectedSurveyCategory form={form} disabled={isDisableAllButDate} />

      <ParticipantGroupsSection />

      <DateSection form={form} />

      <EventLocationSection />

      <EventKeywordsSection />

      <DeclarationSection />
    </>
  );
};

export default EventForm;
