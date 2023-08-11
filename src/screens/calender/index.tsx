import { EventInput, EventSourceInput, DatesSetArg } from "@fullcalendar/core";
import BigCalender from "components/BigCalender";
import Loader from "components/Loader";
import ReactFullCalender from "components/ReactFullCalender";
import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import QueryDataHandler from "components/common/QueryDataHandler";
import dayjs from "dayjs";
import { Button } from "flowbite-react";
import { useMemo, useState } from "react";
// import { Event } from "react-big-calendar";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import {
  useGetCalenderEventsByMonthYearQuery,
  useGetEventsByDateQuery,
  useLazyGetEventsByDateQuery,
} from "store/apis/calender";

const Calender = () => {
  // const [monthYear, setMonthYear] = useState(dayjs().format("MMM YYYY"));
  // const { data, ...restRes } = useGetCalenderEventsByMonthYearQuery(
  //   {
  //     month: dayjs(monthYear).month() + 1,
  //     year: dayjs(monthYear).year(),
  //   },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  /*  */
  const [setstartEndDate, setSetstartEndDate] = useState<{
    startDate: string;
    endDate: string;
  }>({} as any);

  // const { data, ...restRes } = useGetEventsByDateQuery(
  //   {
  //     startDate: setstartEndDate?.startDate ?? "",
  //     endDate: setstartEndDate?.endDate ?? "",
  //   },
  //   {
  //     skip: !setstartEndDate?.endDate || !setstartEndDate?.startDate,
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  const [events, setEvents] = useState<EventInput[]>([]);
  const [getEventsByDate, { ...restRes }] = useLazyGetEventsByDateQuery();

  // const myEventsList: EventSourceInput = useMemo(() => {
  //   return (
  //     data?.data?.map(
  //       ({ starting_date, ending_date, name }): EventInput => ({
  //         title: name,
  //         start: starting_date,
  //         end: ending_date,
  //       })
  //     ) ?? []
  //   );
  // }, [data?.data]);

  // console.log("calender events data: ", myEventsList);

  const handleDateChange = async ({ start, end }: DatesSetArg) => {
    try {
      const eventsByDateRes = await getEventsByDate({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      }).unwrap();
      setEvents(
        eventsByDateRes?.data?.map(
          ({ starting_date, ending_date, name }): EventInput => ({
            title: name,
            start: starting_date,
            end: ending_date,
          })
        ) ?? []
      );
    } catch (error) {}
  };

  console.log({events})

  return (
    // <div>
    //   <QueryDataHandler
    //     {...restRes}
    //     ui={
    //       <div className="text-white">
    // {/* <div className="flex justify-center m-4 !mb-8">
    //   <div className="flex gap-x-4 items-center justify-center">
    //     <Button
    //       type="button"
    //       className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
    //       onClick={() =>
    //         setMonthYear((prev) =>
    //           dayjs(prev).subtract(1, "month").format("MMM YYYY")
    //         )
    //       }
    //       disabled={restRes?.isLoading}
    //     >
    //       <BiLeftArrowAlt className="w-5 h-5" />
    //     </Button>
    //     <p className="min-w-[10rem] text-center">{monthYear}</p>
    //     <Button
    //       type="button"
    //       className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
    //       onClick={() =>
    //         setMonthYear((prev) =>
    //           dayjs(prev).add(1, "month").format("MMM YYYY")
    //         )
    //       }
    //       disabled={restRes?.isLoading}
    //     >
    //       <BiRightArrowAlt className="w-5 h-5" />
    //     </Button>
    //   </div>
    // </div> */}
    // {/* <BigCalender myEventsList={myEventsList} /> */}
    // <ReactFullCalender
    //   // events={myEventsList}
    //   events={events}
    //   onDateChange={handleDateChange}
    // />
    //       {/* </div>
    //     }
    //     loadingUi={<Loader isLoading={restRes?.isLoading} />}
    //     fetchingUi={<FetchingUi />}
    //     errorUi={<ApiError />}
    //   />
    // </div> */}
    <div className="text-white">
      <ReactFullCalender
        // events={myEventsList}
        events={events}
        onDateChange={handleDateChange}
      />
    </div>
  );
};

export default Calender;
