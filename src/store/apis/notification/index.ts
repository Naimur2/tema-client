import {
  ICreateNotificationRes,
  TCreateNotificationArgs,
} from "types/notification";
import { apiSlice } from "..";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation<
      ICreateNotificationRes,
      TCreateNotificationArgs
    >({
      query: (body) => ({
        url: "/fcm/notify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateNotificationMutation } = notificationApiSlice;
