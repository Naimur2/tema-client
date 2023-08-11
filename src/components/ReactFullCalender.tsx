import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventSourceInput, DatesSetArg } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";

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
        weekends={false}
        events={events}
        datesSet={onDateChange}
        // eventContent={renderEventContent}
      />
    </div>
  );
};

export default ReactFullCalender;
