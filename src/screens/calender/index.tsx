import BigCalender from "components/BigCalender";
import Loader from "components/Loader";
import ApiError from "components/common/ApiError";
import FetchingUi from "components/common/FetchingUi";
import QueryDataHandler from "components/common/QueryDataHandler";
import dayjs from "dayjs";
import React from "react";
import { useGetCalenderEventsByMonthYearQuery } from "store/apis/calender";

export interface ICalenderData {
  message?: string;
  data?: IEvent[];
}

export interface IEvent {
  _id?: string;
  name?: string;
  team_id?: string;
  starting_date?: string;
  ending_date?: string;
  __v?: number;
  image?: string;
  location?: string;
}

const Calender = () => {
  const { data, ...restRes } = useGetCalenderEventsByMonthYearQuery({
    month: 7,
    year: 2023,
  });
  const myEventsList = (data as ICalenderData)?.data?.map(
    ({ starting_date, ending_date, name }) => ({
      start: starting_date as unknown as Date,
      end: ending_date as unknown as Date,
      title: name,
    })
  );
  return (
    <div>
      <QueryDataHandler
        {...restRes}
        ui={
          <div className="text-white">
            main content of calender
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
