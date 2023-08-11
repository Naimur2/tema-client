import { Calendar, dayjsLocalizer, Event } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

interface IBigCalender {
    myEventsList?: Event[];
}

const BigCalender = ({ myEventsList }: IBigCalender) => {
    console.log(myEventsList);
    return (
        <div>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                enableAutoScroll={true}
                showAllEvents={true}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "80vh" }}
                defaultDate={new Date()}
                defaultView="month"
                toolbar={false}
                eventPropGetter={(event) => {
                    console.log(event);
                    const backgroundColor =
                        event.title === "All Day Event" ? "red" : "blue";
                    const style = {
                        backgroundColor,
                        borderRadius: "0px",
                        opacity: 0.8,
                        color: "white",
                        border: "0px",
                        display: "block",
                    };
                    return {
                        style,
                    };
                }}
            />
        </div>
    );
};

export default BigCalender;
