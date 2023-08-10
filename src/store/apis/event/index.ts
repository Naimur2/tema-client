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
        url: "/events/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["events"],
    }),
    // work here
    getEvents: builder.query<IEventsData, void>({
      query: () => ({
        url: "/events/all",
        method: "GET",
      }),
      providesTags: ["events"],
    }),
    getEventById: builder.query<ISingleEventData, TSingleEventDataArg>({
      query: ({ id }) => ({
        url: `/events/single/${id}`,
        method: "GET",
      }),
      providesTags: ["singleEvent"],
    }),
    updateEvent: builder.mutation<TUpdateEventRes, IUpdateEventArgs>({
      query: ({ id, ...body }) => ({
        url: `/events/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["events", "singleEvent"],
    }),
    deleteEvent: builder.mutation<IDeleteEventResponse, TDeleteEventArg>({
      query: (id) => ({
        url: `/events/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "events" }];
      },
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
