let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    resourceId: 'a',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    resourceId: 'b',
  },
  {
    id: createEventId(),
    title: 'Daily',
    startTime: '10:45:00',
    endTime: '12:45:00',
    denemeProp1:"ahmet",
    denemeProp2:"ahmet",
    daysOfWeek: [1, 2, 3, 4, 5],
  }
]

export function createEventId() {
  return String(eventGuid++)
}