import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';

const EViewTypes = {
    TimeGridDay: "timeGridDay",
    TimeGridWeek: "timeGridWeek",
    DayGridMonth: "dayGridMonth",
    MultiMonthYear: "multiMonthYear",
    ListDay: "listDay",
    ListWeek: "listWeek",
    ListMonth: "listMonth",
    ListYear: "listYear"
}
//Todo: Pluginler lazy load haline çevrilecek
const ViewPlguins = {
    [EViewTypes.TimeGridDay]: dayGridPlugin,
    [EViewTypes.TimeGridWeek]: timeGridPlugin,
    [EViewTypes.DayGridMonth]: timeGridPlugin,
    [EViewTypes.MultiMonthYear]: multiMonthPlugin,
    [EViewTypes.ListDay]: listPlugin,
    [EViewTypes.ListWeek]: listPlugin,
    [EViewTypes.ListMonth]: listPlugin,
    [EViewTypes.ListYear]: listPlugin
}

export { ViewPlguins, EViewTypes };