import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { ButtonTexts, DefaultToolbar, DefaultViewsConfig, ViewPlguins } from './constants';

const Scheduler = ({ views, events = [], editable, initialView, onShowEventModal, ...props }) => {

    const handleSelect = (args) => {
        const { endStr, startStr } = args;
        onShowEventModal?.({
            start: startStr,
            end: endStr,
        });
    }


    const eventChange = (args) => {
        console.log("eventChange", args);
    }

    const plugins = [];
    const viewsConfig = { ...DefaultViewsConfig };
    const toolbar = { ...DefaultToolbar };
    if (Array.isArray(views)) {
        views.forEach((view) => {
            if (ViewPlguins[view]) {
                if (!plugins.find(x => x === ViewPlguins[view])) {
                    plugins.push(ViewPlguins[view])
                }
            }
            else {
                console.warn("Its not supported view =>", view);
            }
        });

        toolbar.right = views.join(',');
    }
    if (editable) {
        plugins.push(interactionPlugin);
    }



    return <FullCalendar
        locale={"tr"}
        plugins={plugins}
        buttonText={ButtonTexts}
        allDayText='Tüm Gün'
        initialView={initialView || views?.[0]?.type}
        headerToolbar={toolbar}
        views={viewsConfig}
        editable={editable}
        selectable={true}
        navLinks={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventOverlap={false}
        initialEvents={events} // alternatively, use the `events` setting to fetch from a feed
        select={handleSelect}
        eventChange={eventChange}
        {...props}
    />
}

export default Scheduler;
export { EViewTypes } from "./constants";

/*Event base model 
{
    id:string;
    title:string;
    startDate:string;
    endDate:string;
    startTime:string;
    endTime:string;
    allDay:boolean;
    daysOfWeek:Array<number>;
}
*/