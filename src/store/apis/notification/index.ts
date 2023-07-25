import { apiSlice } from "..";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (body) => ({
        url: "/fcm/notify",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateNotificationMutation,
} = notificationApiSlice;
