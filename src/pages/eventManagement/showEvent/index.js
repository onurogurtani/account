import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { CustomPageHeader, errorDialog, Text } from '../../../components';
import { getByEventId } from '../../../store/slice/eventsSlice';
import EventShow from './EventShow';
import EventShowAction from './EventShowAction';
import '../../../styles/eventsManagement/showEvent.scss';
import ModuleShowFooter from '../../../components/ModuleShowFooter';

const ShowEvent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { currentEvent } = useSelector((state) => state?.events);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadEvent(id);
  }, []);

  const loadEvent = useCallback(
    async (id) => {
      const action = await dispatch(getByEventId(id));
      if (!getByEventId.fulfilled.match(action)) {
        if (action?.payload?.message) {
          errorDialog({
            title: <Text t="error" />,
            message: action?.payload?.message,
          });
          history.push('/event-management/list');
        }
      }
    },
    [dispatch],
  );

  return (
    <div className="show-event">
      <CustomPageHeader
        title="Etkinlik Görüntüleme"
        showBreadCrumb
        showHelpButton
        routes={['Etkinlik Yönetimi']}
      ></CustomPageHeader>

      <EventShowAction />
      <EventShow />
      <ModuleShowFooter
        insertTime={currentEvent?.insertTime}
        insertUserFullName={currentEvent?.insertUserFullName}
        updateTime={currentEvent?.updateTime}
        updateUserFullName={currentEvent?.updateUserFullName}
      />
    </div>
  );
};

export default ShowEvent;
