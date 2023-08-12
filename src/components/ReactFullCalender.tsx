import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput, DatesSetArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import '@fullcalendar'

interface IReactFullCalenderProps {
  events?: EventSourceInput;
  onDateChange?: (arg: DatesSetArg) => void;
}

const ReactFullCalender = ({
  events,
  onDateChange,
}: IReactFullCalenderProps) => {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        themeSystem="Simplex"
        weekends
        events={events}
        datesSet={onDateChange}
        // eventContent={renderEventContent}
      />
    </div>
  );
};

export default ReactFullCalender;
