import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { INITIAL_EVENTS } from './utils';
import { ViewPlguins } from './constants';

const Scheduler = ({ views, events, editable, }) => {
    const renderEvent = (event) => {
        console.log(event);
        return <div>
            <span>{event.title}</span>

        </div>
    }

    const handleSelect = (args) => {
        console.log("handleSelect", args);
    }


    const eventChange = (args) => {
        console.log("eventChange", args);
    }

    const plugings = [];
    if (Array.isArray(views)) {
        views.forEach((view) => {
            if (view && typeof view === "object") {
                if (view.tpye && ViewPlguins[view.type]) {
                    if (!plugings.find(x => x === ViewPlguins[view.type])) {
                        plugings.push(ViewPlguins[view.type])
                    }
                }
                else {
                    console.warn("Its not supported view =>", view);
                }
            }
        });
    }
    if (editable) {
        plugings.push(interactionPlugin);
    }

    return <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin, listPlugin]}
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listDay,listWeek,listMonth,listYear'
        }}

        initialView='timeGridWeek'
        views={{
            listDay: {
                buttonText: 'list day'
            },
            listWeek: {
                buttonText: 'list week'
            },
            listMonth: {
                buttonText: 'list month'
            },
            listYear: {
                buttonText: 'list year'
            }
        }}
        locale={"tr"}
        editable={true}
        selectable={true}
        selectMirror={true}
        /// eventContent={renderEvent}
        dayMaxEvents={true}
        weekends={true}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleSelect}
        eventChange={eventChange}
    //eventContent={renderEvent} // custom render function
    // eventClick={this.handleEventClick}
    /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
    />
}

export default Scheduler;

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