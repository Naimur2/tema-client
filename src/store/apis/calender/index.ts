import { ICalenderData, ICalenderDataArgs } from "types/calender";
import { apiSlice } from "..";

export const calenderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCalenderEventsByMonthYear: builder.query<
      ICalenderData,
      ICalenderDataArgs
    >({
      query: ({ month, year }) => ({
        url: `/events/range/month?month=${month}&year=${year}`,
        method: "GET",
      }),
    }),

    getEventsByDate: builder.query<
      ICalenderData,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/events/between/${startDate}/${endDate}}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCalenderEventsByMonthYearQuery, useGetEventsByDateQuery,useLazyGetEventsByDateQuery } =
  calenderApiSlice;
