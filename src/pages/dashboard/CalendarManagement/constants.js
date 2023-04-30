import { EViewTypes } from '../../../components/Scheduler';

const supportedViewTypes = [
    EViewTypes.TimeGridDay,
    EViewTypes.TimeGridWeek,
    EViewTypes.DayGridMonth,
    EViewTypes.MultiMonthYear,
]

export { supportedViewTypes };

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'Empty Event',
        start: todayStr + 'T00:00:00',
        end: todayStr + 'T24:00:00',
    },
]

export const InitialEvents = {

}

export function createEventId() {
    return String(eventGuid++)
}