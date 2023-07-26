import MySwal from "components/MySwal";
import { login, logout, updateToken } from "store/features/auth";

import { apiSlice } from "../index";
import { redirect } from "react-router";
import { IDashBoardData } from "types/dashboard";
import { IUsersData } from "types/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = (await queryFulfilled) as any;

          if (result.data && result.data.user.role === "Admin") {
            dispatch(
              login({
                token: result.data.accessToken,
                user: result.data.user,
                refreshToken: result.data.refreshToken,
              })
            );
            redirect("/dashboard");
          }

          return result;
        } catch (error: any) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.data?.message,
            confirmButtonColor: "#3085d6",
            customClass: {
              confirmButton: `bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    w-full sm:w-auto
                                    `,
              actions: "flex justify-center gap-2",
            },
          });
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = (await queryFulfilled) as any;

          if (result) {
            dispatch(logout());
            localStorage.clear();
            redirect("/");
          }

          return result;
        } catch (error: any) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.data?.message,
            confirmButtonColor: "#3085d6",
            customClass: {
              confirmButton: `bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    w-full sm:w-auto
                                    `,
              actions: "flex justify-center gap-2",
            },
          });
        }
      },
      invalidatesTags: ["stats", "users"],
    }),
    // work here
    getUsers: builder.query<IUsersData, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getStat: builder.query<IDashBoardData, void>({
      query: () => ({
        url: "/auth/stat",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetStatQuery,
} = authApiSlice;
