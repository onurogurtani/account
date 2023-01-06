import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton, CustomCollapseCard, CustomImage, CustomPageHeader } from '../../components';
import EventFilter from './EventFilter';
import iconFilter from '../../assets/icons/icon-filter.svg';
import EventListTable from './EventListTable';
import useGetEvents from './hooks/useGetEvents';
import '../../styles/table.scss';
import '../../styles/eventsManagement/listEvent.scss';

const EventList = () => {
  const history = useHistory();
  useGetEvents((data) => setIsEventFilter(data));

  const [isEventFilter, setIsEventFilter] = useState(false);

  const addEvent = () => {
    history.push('/event-management/add');
  };

  return (
    <CustomPageHeader title="Etkinlikler" showBreadCrumb showHelpButton routes={['Etkinlik Yönetimi']}>
      <CustomCollapseCard className="video-list" cardTitle="Etkinlikler">
        <div className="table-header">
          <CustomButton className="add-btn" onClick={addEvent}>
            YENİ ETKİNLİK EKLE
          </CustomButton>
          <CustomButton data-testid="search" className="search-btn" onClick={() => setIsEventFilter((prev) => !prev)}>
            <CustomImage src={iconFilter} />
          </CustomButton>
        </div>
        {isEventFilter && <EventFilter />}
        <EventListTable />
      </CustomCollapseCard>
    </CustomPageHeader>
  );
};

export default EventList;
