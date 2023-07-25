import { Calendar, dayjsLocalizer, Event } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

interface IBigCalender {
  myEventsList?: Event[];
}

const BigCalender = ({ myEventsList }: IBigCalender) => {
  console.log({ myEventsList });
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        defaultDate={new Date()}
        defaultView="month"
      />
    </div>
  );
};

export default BigCalender;
