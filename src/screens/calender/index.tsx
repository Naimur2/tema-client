import BigCalender from "components/BigCalender";
import Loader from "components/Loader";
import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import QueryDataHandler from "components/common/QueryDataHandler";
import dayjs from "dayjs";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useGetCalenderEventsByMonthYearQuery } from "store/apis/calender";

// const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Calender = () => {
    const [monthYear, setMonthYear] = useState(dayjs().format("MMM YYYY"));
    const [myEventsList, setMyEventsList] = useState<any[]>([]);
    const { data, ...restRes } = useGetCalenderEventsByMonthYearQuery(
        {
            month: dayjs(monthYear).month() + 1,
            year: dayjs(monthYear).year(),
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    React.useEffect(() => {
        const eventsListArry = data?.data?.map(
            ({ starting_date, ending_date, name }) => ({
                start: dayjs(starting_date).toDate(),
                end: dayjs(ending_date).toDate(),
                title: name,
            })
        );
        setMyEventsList(eventsListArry || []);
    }, [data]);

    return (
        <div>
            <QueryDataHandler
                {...restRes}
                ui={
                    <div className="text-white">
                        <div className="flex justify-center m-4 !mb-8">
                            <div className="flex gap-x-4 items-center justify-center">
                                <Button
                                    type="button"
                                    className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
                                    onClick={() =>
                                        setMonthYear((prev) =>
                                            dayjs(prev)
                                                .subtract(1, "month")
                                                .format("MMM YYYY")
                                        )
                                    }
                                    disabled={restRes?.isLoading}
                                >
                                    <BiLeftArrowAlt className="w-5 h-5" />
                                </Button>
                                <p className="min-w-[10rem] text-center">
                                    {monthYear}
                                </p>
                                <Button
                                    type="button"
                                    className="w-full lg:w-auto bg-primary-900 hover:bg-primary-700"
                                    onClick={() =>
                                        setMonthYear((prev) =>
                                            dayjs(prev)
                                                .add(1, "month")
                                                .format("MMM YYYY")
                                        )
                                    }
                                    disabled={restRes?.isLoading}
                                >
                                    <BiRightArrowAlt className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <BigCalender myEventsList={myEventsList} />
                    </div>
                }
                loadingUi={<Loader isLoading={restRes?.isLoading} />}
                fetchingUi={<FetchingUi />}
                errorUi={<ApiError />}
            />
        </div>
    );
};

export default Calender;
