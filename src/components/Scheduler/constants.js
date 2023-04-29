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

const DefaultViewsConfig = {
    [EViewTypes.TimeGridDay]: {
        buttonText: "Günlük",
    },
    [EViewTypes.TimeGridWeek]: {
        buttonText: "Haftalık",
    },
    [EViewTypes.DayGridMonth]: {
        buttonText: "Aylık",
    },
    [EViewTypes.MultiMonthYear]: {
        buttonText: "Yıllık",
    },

    [EViewTypes.ListDay]: {
        buttonText: "Günlük Liste",
    },
    [EViewTypes.ListWeek]: {
        buttonText: "Haftalık Liste",
    },
    [EViewTypes.ListMonth]: {
        buttonText: "Aylık Liste",
    },
    [EViewTypes.ListYear]: {
        buttonText: "Yıllık Liste",
    },

}

const DefaultToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: '',
}
export { ViewPlguins, EViewTypes, DefaultViewsConfig, DefaultToolbar };

