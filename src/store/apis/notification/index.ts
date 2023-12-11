import {
    ICreateNotificationRes,
    TCreateNotificationArgs,
} from "types/notification";
import { apiSlice } from "..";
import { INotificationResponse, IPagination } from "./type";

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
            invalidatesTags: ["notifications"],
        }),
        getNotifications: builder.query<INotificationResponse, void>({
            query: () => ({
                url: "/fcm/notifications?page=1&limit=15",
            }),
            providesTags: ["notifications"],
        }),
        getMoreNotifications: builder.query<INotificationResponse, IPagination>(
            {
                query: ({ limit, page }) => ({
                    url: `/fcm/notifications?page=${page}&limit=${limit}`,
                }),
                onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                    const data = await queryFulfilled;
                    dispatch(
                        notificationApiSlice.util.updateQueryData(
                            "getNotifications",
                            undefined,
                            (draft) => {
                                draft.data.push(...data.data.data);
                            }
                        )
                    );
                },
            }
        ),
    }),
});

export const {
    useCreateNotificationMutation,
    useGetNotificationsQuery,
    useGetMoreNotificationsQuery,
} = notificationApiSlice;
