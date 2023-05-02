import { EEventTypes } from "../enums";

const getInitialEvent = () => {
    let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
    return {
        id: "-1", // -1 id form temp data 
        title: '',
        start: todayStr + 'T00:00:00',
        end: todayStr + 'T24:00:00',
        type: EEventTypes.Default,
    }
}
export function getInitialEventData(eventType) {
    const initialEvents = {
        [EEventTypes.Default]: {
            ...getInitialEvent(),
        },
        [EEventTypes.Exam]: {
            ...getInitialEvent(),
            type: EEventTypes.Exam,
            userGroups: [],
        }
    }
    return initialEvents[eventType] || getInitialEvent();
}