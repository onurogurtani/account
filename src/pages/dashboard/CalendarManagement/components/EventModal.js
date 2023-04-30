import CustomModal from "../../../../components/CustomModal";
import EventFormCommon from "./EventFormCommon";
import dayjs from "dayjs"
const EventModal = ({ event, show, onClose, onSucces }) => {
    const _onSucces = () => {
        //onSucces?.(payload);
    }

    return <CustomModal
        title="Basic Modal"
        open={show}
        onOk={_onSucces}
        onCancel={onClose}>
        <EventFormCommon startDate={dayjs(event?.start)} endDate={dayjs(event?.end)} />

    </CustomModal>
}
export default EventModal;