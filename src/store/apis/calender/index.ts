import { ICalenderData, ICalenderDataArgs } from "types/calender";
import { apiSlice } from "..";

export const calenderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalenderEventsByMonthYear: builder.query<
      ICalenderData,
      ICalenderDataArgs
    >({
      query: ({ month, year }) => ({
        url: `/events?month=${month}&year=${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCalenderEventsByMonthYearQuery } = calenderApiSlice;
