import { useState } from 'react';
import FullScheduler, { EViewTypes } from '../../../components/Scheduler';
import EventModal from './components/EventModal';
import { supportedViewTypes } from './constants';
import { getInitialEventData } from './helpers';


const CalenderManagement = () => {

    const [showEventModal, setShowEventModal] = useState(false);
    const [currentEvent, setCurrentevent] = useState();

    const onShowEventModal = (event) => {
        if (!event.id) {
            setCurrentevent({ ...getInitialEventData(), ...event });
        }
        else {
            setCurrentevent(event);
        }
        setShowEventModal(true);
    }

    const onCloseModal = () => {
        setCurrentevent(null);
        setShowEventModal(false);
    }

    const onSucces = (event) => {
        onCloseModal();

    }

    return <>
        <FullScheduler
            editable={true}
            initialView={EViewTypes.TimeGridWeek}
            onShowEventModal={onShowEventModal}
            views={supportedViewTypes}

        />
        <EventModal
            show={showEventModal}
            event={currentEvent}
            onClose={onCloseModal}
            onSucces={onSucces}
        />
    </>
}
export default CalenderManagement;