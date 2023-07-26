import { apiSlice } from "..";
import {
  ICreateEventResponse,
  IEventsData,
  ISingleEventData,
  ICreateEventArgs,
  TSingleEventDataArg,
  IDeleteEventResponse,
  TDeleteEventArg,
  TUpdateEventRes,
  IUpdateEventArgs,
} from "types/event";

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<ICreateEventResponse, ICreateEventArgs>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),
    // work here
    getEvents: builder.query<IEventsData, void>({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    getEventById: builder.query<ISingleEventData, TSingleEventDataArg>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    updateEvent: builder.mutation<TUpdateEventRes, IUpdateEventArgs>({
      query: ({ id, ...body }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["events"],
    }),
    deleteEvent: builder.mutation<IDeleteEventResponse, TDeleteEventArg>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApiSlice;
