import { ICalenderData, ICalenderDataArgs } from "types/calender";
import { apiSlice } from "..";

export const calenderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalenderEventsByMonthYear: builder.query<
      ICalenderData,
      ICalenderDataArgs
    >({
      query: ({ month, year }) => ({
        url: `/events?month=1&year=2023`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCalenderEventsByMonthYearQuery } = calenderApiSlice;
